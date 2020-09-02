const { User } = require('../../models');

const getPaymentsStats = () =>
  User.aggregate([
    {
      $match: { role: 'admin' },
    },
    {
      $lookup: {
        from: 'accounts',
        localField: 'account',
        foreignField: '_id',
        as: 'account',
      },
    },
    {
      $unwind: { path: '$account', preserveNullAndEmptyArrays: true },
    },
    {
      $lookup: {
        from: 'bookings',
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$status', 'confirmed'] },
                  { $gt: ['$price', 0] },
                ],
              },
            },
          },
          {
            $project: {
              paidAmount: 1,
              presspadRatio: { $multiply: ['$paidAmount', 0.45] },
            },
          },
        ],
        as: 'pendingBookings',
      },
    },
    // lookup hosts balance
    {
      $lookup: {
        from: 'users',
        pipeline: [
          { $match: { role: 'host' } },
          {
            $lookup: {
              from: 'accounts',
              localField: 'account',
              foreignField: '_id',
              as: 'account',
            },
          },
          {
            $unwind: { path: '$account', preserveNullAndEmptyArrays: true },
          },
        ],
        as: 'hostsAccounts',
      },
    },
    // lookup org balance
    {
      $lookup: {
        from: 'users',
        pipeline: [
          { $match: { role: 'organisation' } },
          {
            $lookup: {
              from: 'accounts',
              localField: 'account',
              foreignField: '_id',
              as: 'account',
            },
          },
          {
            $unwind: { path: '$account', preserveNullAndEmptyArrays: true },
          },
        ],
        as: 'orgsAccounts',
      },
    },
    // lookup unused coupons
    {
      $lookup: {
        from: 'coupons',
        pipeline: [
          { $match: { $expr: { $gt: ['$reservedAmount', '$usedAmount'] } } },
          {
            $project: {
              reservedAmount: 1,
              usedAmount: 1,
              unused: { $subtract: ['$reservedAmount', '$usedAmount'] },
            },
          },
        ],
        as: 'coupons',
      },
    },
    {
      $project: {
        account: 1,
        // pendingBookings: 1,
        presspadPendingIncome: { $sum: '$pendingBookings.presspadRatio' },
        // hostsAccounts: 1,
        hostsBalance: { $sum: '$hostsAccounts.account.currentBalance' },
        // orgsAccounts: 1,
        orgsBalance: { $sum: '$orgsAccounts.account.currentBalance' },
        // coupons: 1,
        unusedCoupons: { $sum: '$coupons.unused' },
      },
    },
  ]);

module.exports = getPaymentsStats;
