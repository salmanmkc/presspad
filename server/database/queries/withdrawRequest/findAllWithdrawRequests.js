const WithdrawRequest = require('../../models/WithdrawRequest');

// const findAllWithdrawRequests = () =>
//   WithdrawRequest.find()
//     .populate({ path: 'user', select: 'name' })
//     .exec();

const findAllWithdrawRequests = () =>
  WithdrawRequest.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'userInfo',
      },
    },
    {
      $lookup: {
        from: 'profiles',
        localField: 'user',
        foreignField: 'user',
        as: 'profile',
      },
    },
    {
      $unwind: '$userInfo',
    },
    {
      $unwind: '$profile',
    },
    {
      $project: {
        accountNumber: 1,
        amount: 1,
        bankName: 1,
        sortCode: '$bankSortCode',
        createdAt: 1,
        status: 1,
        reason: 1,
        id: '$user',
        'host/intern': '$userInfo.name',
        email: '$userInfo.email',
        contactNumber: '$profile.phoneNumber',
      },
    },
  ]);

module.exports = findAllWithdrawRequests;
