const mongoose = require('mongoose');

const { Account, User, InternalTransaction } = require('../../models');

/**
 * Create an internal transaction, Must be done inside a database transaction session
 * @param {string} userId The user who done the transaction
 * @param {string} fromAccount User account ID
 * @param {string} toAccount
 * @param {number} amount
 * @param {string} type Type of transaction "installment", "donation", "couponTransaction"
 * @param {session} session Transaction session
 */
const createInternalTransaction = async (
  userId,
  fromAccount,
  toAccount,
  amount,
  type,
  session,
) => {
  let bulkWriteArr;
  const { account: pressPadAccountId } = await User.findOne({
    role: 'admin',
  }).session(session);

  const internaltransaction = InternalTransaction.create(
    [
      {
        user: userId,
        from: fromAccount || pressPadAccountId,
        to: toAccount,
        amount,
        type,
      },
    ],
    { session },
  );

  switch (type) {
    case 'installment':
      // update intern Account "from"
      bulkWriteArr = [
        {
          updateOne: {
            filter: { _id: mongoose.Types.ObjectId(fromAccount) },
            update: {
              $inc: { currentBalance: -1 * amount },
            },
          },
        },
        // update host account "to"
        {
          updateOne: {
            filter: { _id: mongoose.Types.ObjectId(toAccount) },
            update: {
              $inc: { currentBalance: 0.45 * amount, income: 0.45 * amount },
            },
          },
        },
        // update presspad account
        {
          updateOne: {
            filter: { _id: mongoose.Types.ObjectId(pressPadAccountId) },
            update: {
              $inc: {
                bursaryFunds: 0.1 * amount,
                hostingIncome: 0.45 * amount,
              },
            },
          },
        },
      ];
      break;

    case 'couponTransaction':
      // update org account "from"
      // the coupon amount have been already substracted before from the current balance
      // and adde to couponsValue, so we should substract it from couponsValue
      bulkWriteArr = [
        {
          updateOne: {
            filter: { _id: mongoose.Types.ObjectId(fromAccount) },
            update: {
              $inc: { couponsValue: -1 * amount },
            },
          },
        },
        // update host account "to"
        {
          updateOne: {
            filter: { _id: mongoose.Types.ObjectId(toAccount) },
            update: {
              $inc: { currentBalance: 0.45 * amount, income: 0.45 * amount },
            },
          },
        },
        // update presspad account
        {
          updateOne: {
            filter: { _id: mongoose.Types.ObjectId(pressPadAccountId) },
            update: {
              $inc: {
                bursaryFunds: 0.1 * amount,
                hostingIncome: 0.45 * amount,
              },
            },
          },
        },
      ];
      break;

    case 'donation':
      // update host or others account "from"
      bulkWriteArr = [
        {
          updateOne: {
            filter: { _id: mongoose.Types.ObjectId(fromAccount) },
            update: {
              $inc: { currentBalance: -1 * amount, donation: amount },
            },
          },
        },
        // no need to update presspad account since external transaction (source of money) update it
      ];
      break;

    case 'bursaryTransaction':
      bulkWriteArr = [
        // update host account "to"
        {
          updateOne: {
            filter: { _id: mongoose.Types.ObjectId(toAccount) },
            update: {
              $inc: { currentBalance: 0.45 * amount, income: 0.45 * amount },
            },
          },
        },
        // update presspad account
        {
          updateOne: {
            filter: { _id: mongoose.Types.ObjectId(pressPadAccountId) },
            update: {
              $inc: {
                bursaryFunds: 0.1 * amount,
                hostingIncome: 0.45 * amount,
              },
            },
          },
        },
      ];

      break;

    default:
      throw new Error(
        'type must be installment, donation or couponTransaction',
      );
  }

  const updatedAccounts = Account.bulkWrite(bulkWriteArr, { session });

  const [inTransaction] = await Promise.all([
    internaltransaction,
    updatedAccounts,
  ]);

  return inTransaction[0];
};

module.exports = { createInternalTransaction };
