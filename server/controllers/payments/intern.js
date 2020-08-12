const mongoose = require('mongoose');
const stripe = require('stripe')(process.env.stripeSK);
const boom = require('boom');
const moment = require('moment');

const Sentry = require('../../sentry');
const { getBookingById } = require('../../database/queries/bookings');
const { getCoupons } = require('../../database/queries/coupon');
const { discountStripeFees } = require('../../database/queries/payments');

const generatePaymentResponse = require('./generatePaymentResponse');
const internTransaction = require('./internTransaction');

const { schedulePaymentReminders } = require('../../services/mailing');

const {
  getDiscountDays,
  calculatePrice,
  createInstallments,
  compareInstallments,
  getFirstUnpaidInstallment,
  createUpdatedNewInstallments,
} = require('../../helpers/payments');

const internPayment = async (req, res, next) => {
  const {
    paymentMethod,
    paymentIntent,
    paymentInfo,
    couponInfo,
    bookingId,
    withoutPay,
  } = req.body;

  try {
    const [booking] = await getBookingById(bookingId, 'intern');
    // check for Authorization
    if (!req.user) return next(boom.forbidden('req.user undefined'));
    if (req.user.role !== 'intern')
      return next(boom.forbidden('user is not an Intern'));
    if (req.user._id.toString() !== booking.intern.toString())
      return next(boom.forbidden("user didn't match booking.internId"));

    // check if the booking is confirmed
    if (!['accepted', 'confirmed'].includes(booking.status))
      return next(
        boom.badData(
          `booking is not confirmed. The booking status is ${booking.status}`,
        ),
      );

    let amount;
    let couponDiscount = 0;
    let couponDiscountDays = 0;
    let couponOrganisationAccount;
    let couponId;
    let updatedInstallments;

    if (!couponInfo.couponCode && withoutPay)
      return next(boom.badData('coupon must be used'));

    // Coupon used
    if (couponInfo.couponCode) {
      const [coupon] = await getCoupons({
        code: couponInfo.couponCode,
      }).exec();

      let installmentDate;
      if (booking.installments[0]) {
        const firstUnpaid = getFirstUnpaidInstallment(booking.installments);
        installmentDate = firstUnpaid.dueDate;
      }

      // get coupon discount days that maches the booking dates
      const { discountDays } = getDiscountDays({
        bookingStart: booking.startDate,
        installmentDate,
        bookingEnd: booking.endDate,
        couponStart: coupon.startDate,
        couponEnd: coupon.endDate,
        usedDays: coupon.usedDays,
      });

      // Validate discount days
      if (discountDays !== couponInfo.discountDays)
        return next(boom.badData('wrong coupon Info'));

      // Calculate coupon discount amount
      couponDiscount =
        (calculatePrice(discountDays) * coupon.discountRate) / 100;

      // Validate discount amount
      if (couponDiscount !== couponInfo.couponDiscount)
        return next(boom.badData('wrong coupon Info'));

      couponDiscountDays = discountDays;
      couponOrganisationAccount = coupon.organisationAccount;
      couponId = coupon._id;
    }

    // User ask to create new installments
    if (Array.isArray(paymentInfo) || !paymentInfo._id) {
      // check for old installments
      if (booking.installments[0])
        return next(boom.badData('booking already have installments'));

      // calculate installments and compare them
      let newInstallments;
      const bookingDays =
        moment(booking.endDate).diff(booking.startDate, 'd') + 1;
      // if 3 installments
      if (Array.isArray(paymentInfo)) {
        newInstallments = createInstallments({
          couponInfo,
          bookingDays,
          startDate: booking.startDate,
          endDate: booking.endDate,
          upfront: false,
        });
        // eslint-disable-next-line prefer-destructuring
        amount = newInstallments[0].amount;
      } else {
        // if paying upfront
        newInstallments = createInstallments({
          couponInfo,
          bookingDays,
          startDate: booking.startDate,
          endDate: booking.endDate,
          upfront: true,
        });
        // eslint-disable-next-line prefer-destructuring
        amount = newInstallments.amount;
      }

      if (!compareInstallments(paymentInfo, newInstallments))
        return next(boom.badData('wrong installments info'));
    } else {
      // old installment

      // check coupon info
      if (couponInfo.couponCode) {
        if (booking.coupon)
          return next(boom.badData('can only use coupon once per a booking'));

        updatedInstallments = createUpdatedNewInstallments({
          installments: booking.installments,
          couponInfo,
        });
      }

      const checkInstallment = updatedInstallments || booking.installments;

      const firstUnpaidInstallment = getFirstUnpaidInstallment(
        checkInstallment,
      );

      // eslint-disable-next-line prefer-destructuring
      amount = firstUnpaidInstallment.amount;

      if (paymentInfo._id.toString() !== firstUnpaidInstallment._id.toString())
        return next(boom.badData('bad installment info'));
      if (paymentInfo.amount !== firstUnpaidInstallment.amount)
        return next(boom.badData('bad amount info'));
    }

    // start a mongodb session
    const session = await mongoose.startSession();
    // start transaction
    await session.startTransaction();

    // do all db transaction before confirming stripe payment
    const stripeInfo = paymentMethod || paymentIntent;
    const coupon = {
      couponDiscount,
      couponDiscountDays,
      couponOrganisationAccount,
      couponId,
    };
    try {
      // do all transaction queries
      const { storedInstallments } = await internTransaction(
        session,
        paymentInfo,
        booking,
        stripeInfo,
        amount,
        coupon,
        updatedInstallments,
        withoutPay,
      );

      let response;
      if (withoutPay) {
        response = { success: true };
        await session.commitTransaction();
      } else {
        // confirm stripe payments
        let intent; // to store the stripe info respone then check if it require 3d secure
        if (paymentMethod) {
          intent = await stripe.paymentIntents.create({
            payment_method: paymentMethod.id,
            amount,
            currency: 'gbp',
            confirmation_method: 'manual',
            confirm: true,
          });
        } else if (paymentIntent) {
          intent = await stripe.paymentIntents.confirm(paymentIntent.id);
        } else {
          throw boom.badData('no payment object from the client');
        }

        response = await generatePaymentResponse(intent);

        // check if payment confirmed then commit transaction
        if (response.success) {
          await session.commitTransaction();

          try {
            if (Array.isArray(paymentInfo)) {
              // create payments reminders only once when paying in installments
              // ToDo  modify to match 4week dates
              await schedulePaymentReminders({
                bookingId,
                installments: storedInstallments,
                startDate: booking.startDate,
                endDate: booking.endDate,
                internId: booking.intern,
                hostId: booking.host,
                // session,  // ToDo Debug it later then move it up
              });
            }

            const { fee } = await stripe.balanceTransactions.retrieve(
              intent.charges.data[0].balance_transaction,
            );

            await discountStripeFees(fee, 'installment');
          } catch (error) {
            // add logs on sentry for this failing errors
            // should not throw an error because at this point
            // the stripe payment has been successful and stored in db
            Sentry.captureException(error);
          }
        } else {
          await session.abortTransaction();
          // await session.endSession();
        }
      }

      return res.json(response);
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  } catch (error) {
    if (error.statusCode === 402) {
      return next(boom.paymentRequired(error.message));
    }
    return next(boom.badImplementation(error));
  }
};

module.exports = internPayment;
