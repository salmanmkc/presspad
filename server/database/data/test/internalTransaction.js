const InternalTransaction = require('../../models/InternalTransaction');

const reset = () => InternalTransaction.deleteMany();

const createAll = async ({ accounts, users, bookings, couponDiscountRate }) => {
  const { internUser, organisationUser } = users;
  const { hostAccount, internAccount, organisationAccount } = accounts;
  const {
    confirmedPaidUpfront,
    confirmedPaidFirst,
    confirmedPaidFirstNoCoupon,
    completedBooking,
  } = bookings;

  await reset();

  const internalTransactions = [
    // confirmedPaidUpfront installment
    {
      user: internUser._id,
      from: internAccount._id,
      to: hostAccount._id,
      amount: confirmedPaidUpfront.payedAmount,
      type: 'installment',
    },
    // from organsisation to host
    {
      user: organisationUser._id,
      // this is the account for the org not the user
      from: organisationAccount._id,
      to: hostAccount._id,
      amount: (confirmedPaidUpfront.price * couponDiscountRate) / 100, // 50
      type: 'couponTransaction',
    },
    // confirmedPaidFirst
    {
      user: internUser._id,
      from: internAccount._id,
      to: hostAccount._id,
      amount: confirmedPaidFirst.payedAmount,
      type: 'installment',
    },
    // confirmedPaidFirstNoCoupon
    {
      user: internUser._id,
      from: internAccount._id,
      to: hostAccount._id,
      amount: confirmedPaidFirstNoCoupon.payedAmount,
      type: 'installment',
    },
    // confirmedPaidFirstNoCoupon
    {
      user: internUser._id,
      from: internAccount._id,
      to: hostAccount._id,
      amount: completedBooking.payedAmount,
      type: 'installment',
    },
  ];
  const [
    internalTransactionsPaidUpFrontIntern,
    internalTransactionsPaidUpFrontCoupon,
    internalTransactionsConfirmedPaidFirst,
    internalTransactionsConfirmedPaidFirstNoCoupon,
    internalTransactionsCompletedBooking,
  ] = await InternalTransaction.create(internalTransactions);

  return {
    internalTransactionsPaidUpFrontIntern,
    internalTransactionsPaidUpFrontCoupon,
    internalTransactionsConfirmedPaidFirst,
    internalTransactionsConfirmedPaidFirstNoCoupon,
    internalTransactionsCompletedBooking,
  };
};

module.exports = {
  createAll,
  reset,
};
