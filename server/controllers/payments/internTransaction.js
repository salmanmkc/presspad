const {
  createInstallments,
  createExternalTransaction,
  createInternalTransaction,
  updatePaidInstallment,
  updateCouponTransaction,
  updateBooking,
  updateUnpaidInstallments,
  removeUnpaidInstallments,
  removePaymentsReminders,
} = require('../../database/queries/payments');
const { updateBursaryApplication } = require('../../database/queries/bursary');

const { getUserById } = require('../../database/queries/user');

const { getFirstUnpaidInstallment } = require('../../helpers/payments');

const { bookingStatuses } = require('../../constants');

const internTransaction = async (
  session,
  paymentInfo,
  booking,
  stripeInfo,
  amount,
  coupon,
  bursaryApplicationId,
  bursaryDiscount,
  updatedInstallments,
  withoutPay,
) => {
  const { _id: bookingId, intern, host } = booking;

  const [
    { account: internAccount },
    { account: hostAccount },
  ] = await Promise.all([getUserById(intern, true), getUserById(host, true)]);

  let newBookingStatus;
  let installments;
  const { couponId } = coupon;
  // check if new installments
  if (Array.isArray(paymentInfo) || !paymentInfo._id) {
    newBookingStatus = bookingStatuses.confirmed;
    if (!withoutPay) {
      // create installments
      installments = await createInstallments(
        paymentInfo,
        bookingId,
        intern,
        host,
        session,
      );
      // create external transaction
      await createExternalTransaction(
        intern,
        internAccount,
        amount,
        stripeInfo,
        'deposite',
        session,
      );

      // create internal transaction for the installment
      const transaction = await createInternalTransaction(
        intern,
        internAccount,
        hostAccount,
        amount,
        'installment',
        session,
      );

      // update the paid installment
      const firstInstallment = await getFirstUnpaidInstallment(installments);
      await updatePaidInstallment(
        firstInstallment._id,
        transaction._id,
        session,
      );
    }

    // update bursary
    if (bursaryApplicationId) {
      // create internal transaction for bursary
      const transaction = await createInternalTransaction(
        intern,
        null,
        hostAccount,
        bursaryDiscount,
        'bursaryTransaction',
        session,
      );

      // update bursaryApplication
      const updateData = {
        $inc: { totalSpentSoFar: bursaryDiscount },
        $push: {
          transactions: {
            amount: bursaryDiscount,
            booking: bookingId,
            transaction: transaction._id,
          },
        },
      };

      await updateBursaryApplication({
        id: bursaryApplicationId,
        updateData,
        session,
      });
    }
  } else {
    // user paying old installment
    let transaction;
    if (!withoutPay) {
      // create external transaction
      await createExternalTransaction(
        intern,
        internAccount,
        amount,
        stripeInfo,
        'deposite',
        session,
      );

      // create internal transaction for the installment
      transaction = await createInternalTransaction(
        intern,
        internAccount,
        hostAccount,
        amount,
        'installment',
        session,
      );
    }

    // if used coupon update unpaidInstallments
    if (couponId) {
      const installmentsIds = updatedInstallments.reduce((acc, curr) => {
        if (!curr.transaction) {
          acc.push(curr._id);
        }
        return acc;
      }, []);
      if (withoutPay) {
        await removeUnpaidInstallments(installmentsIds, session);
      } else {
        await updateUnpaidInstallments(updatedInstallments, session);
      }
      await removePaymentsReminders(installmentsIds, session);
    }

    // has to come after updateUnpaidInstallments
    if (!withoutPay) {
      await updatePaidInstallment(paymentInfo._id, transaction._id, session);
    }
  }

  // check if there is a coupon used
  if (couponId) {
    const {
      couponDiscount,
      couponDiscountDays,
      couponOrganisationAccount,
    } = coupon;

    const { _id: transactionId } = await createInternalTransaction(
      intern,
      couponOrganisationAccount,
      hostAccount,
      couponDiscount,
      'couponTransaction',
      session,
    );

    await updateCouponTransaction(
      intern,
      couponId,
      transactionId,
      bookingId,
      couponDiscountDays,
      couponDiscount,
      session,
    );
  }

  await updateBooking({
    bookingId,
    amount,
    status: newBookingStatus,
    couponId,
    session,
  });

  return { storedInstallments: installments };
};

module.exports = internTransaction;
