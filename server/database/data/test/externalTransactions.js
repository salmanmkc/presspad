const ExternalTransaction = require('../../models/ExternalTransaction');

const reset = () => ExternalTransaction.deleteMany();

const createAll = async ({ users, accounts }) => {
  await reset();

  const { organisationUser, internUser } = users;
  const { organisationAccount, internAccount } = accounts;

  const externalTransactions = [
    // organisations for paying the coupon expenses
    {
      user: organisationUser._id,
      account: organisationAccount._id,
      type: 'deposite',
      amount: 6000,
      createdAt: Date.now() - 25 * 24 * 60 * 60 * 1000,
    },
    {
      user: organisationUser._id,
      account: organisationAccount._id,
      type: 'deposite',
      amount: 365000,
      createdAt: Date.now() - 15 * 24 * 60 * 60 * 1000,
    },
    // intern paying the confirmed booking upfront
    {
      user: internUser._id,
      account: internAccount._id,
      type: 'deposite',
      amount: 5000,
      createdAt: Date.now(),
    },
    // intern paying the conrfimed booking (first payment)
    {
      user: internUser._id,
      account: internAccount._id,
      type: 'deposite',
      amount: 14000,
      createdAt: Date.now(),
    },
    // intern paying the conrfimed booking (first payment) no coupon
    {
      user: internUser._id,
      account: internAccount._id,
      type: 'deposite',
      amount: 28000,
      createdAt: Date.now(),
    },
  ];
  const [
    organisationTransaction,
    internPayingUpfrontTransaction,
    internPayingFirstTransaction,
    internPayingFirstTransactionNoCoupon,
  ] = await ExternalTransaction.create(externalTransactions);

  return {
    organisationTransaction,
    internPayingUpfrontTransaction,
    internPayingFirstTransaction,
    internPayingFirstTransactionNoCoupon,
  };
};

module.exports = {
  createAll,
  reset,
};
