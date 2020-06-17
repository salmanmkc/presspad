const {
  createInstallments,
  createExternalTransaction,
  createInternalTransaction,
  updatePaidInstallment,
  updateCouponTransaction,
  updateBooking,
} = require('../../database/queries/payments');

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
) => {
  const { _id: bookingId, intern, host } = booking;

  const [
    { account: internAccount },
    { account: hostAccount },
  ] = await Promise.all([getUserById(intern, true), getUserById(host, true)]);

  let newBookingStatus;
  const { couponId } = coupon;
  // check if new installments
  if (Array.isArray(paymentInfo) || !paymentInfo._id) {
    newBookingStatus = bookingStatuses.confirmed;
    // create installments
    const installments = await createInstallments(
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
    await updatePaidInstallment(firstInstallment._id, transaction._id, session);

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
  } else {
    // user paying old installment
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

    await updatePaidInstallment(
      paymentInfo._id,
      transaction._id,
      bookingId,
      amount,
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
};

module.exports = internTransaction;
