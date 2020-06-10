const Installment = require('../../models/Installment');

const reset = () => Installment.deleteMany();

const createAll = async ({ bookings, users, internalTransactions }) => {
  const {
    internalTransactionsPaidUpFrontIntern,
    internalTransactionsConfirmedPaidFirst,
  } = internalTransactions;
  const { internUser, hostUser } = users;
  await reset();

  const { confirmedPaidUpfront, confirmedPaidFirst } = bookings;

  const installments = [
    // for the confirmed booking and paid upfront
    {
      booking: confirmedPaidUpfront._id,
      intern: internUser._id,
      host: hostUser._id,
      amount: confirmedPaidUpfront.payedAmount,
      dueDate: Date.now(),
      transaction: internalTransactionsPaidUpFrontIntern._id,
    },
    // for the confimed booking and paid first insatallment
    {
      booking: confirmedPaidFirst._id,
      intern: internUser._id,
      host: hostUser._id,
      amount: confirmedPaidFirst.payedAmount,
      dueDate: Date.now(),
      transaction: internalTransactionsConfirmedPaidFirst._id,
    },
    {
      booking: confirmedPaidFirst._id,
      intern: internUser._id,
      host: hostUser._id,
      amount: 28000,
      dueDate: Date.now() + 179 * 24 * 60 * 60 * 1000,
    },
    {
      booking: confirmedPaidFirst._id,
      intern: internUser._id,
      host: hostUser._id,
      amount: 4000,
      dueDate: Date.now() + 207 * 24 * 60 * 60 * 1000,
    },
  ];
  const [
    upfrontPayment,
    firstPaidPayment,
    secondUnpaidPayment,
    thirdUnpaidPayment,
  ] = await Installment.create(installments);

  return {
    upfrontPayment,
    firstPaidPayment,
    secondUnpaidPayment,
    thirdUnpaidPayment,
  };
};

module.exports = {
  createAll,
  reset,
};
