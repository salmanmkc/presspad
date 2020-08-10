const mongoose = require('mongoose');

const { Account, User } = require('../../models');

module.exports.createNewAccount = () => Account.create({});

module.exports.returnCouponsValueToOrg = ({ id, returnedAmount, session }) =>
  Account.updateOne(
    { _id: id },
    {
      $inc: {
        currentBalance: returnedAmount,
        couponsValue: -returnedAmount,
      },
    },
    {
      session,
    },
  );

module.exports.getAccoutById = accountId => Account.findById(accountId);

module.exports.getAccountByUserId = userId =>
  Account.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: 'account',
        as: 'user',
      },
    },
    {
      $unwind: { path: '$user', preserveNullAndEmptyArrays: true },
    },
    {
      $match: {
        $expr: {
          $eq: ['$user._id', mongoose.Types.ObjectId(userId)],
        },
      },
    },
    {
      $project: {
        user: 0,
      },
    },
  ]);
