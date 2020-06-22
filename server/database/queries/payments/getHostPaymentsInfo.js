const mongoose = require('mongoose');

const { User } = require('../../models');
// const { bookingStatuses } = require('../../../constants');

const getHostPaymentsInfo = id =>
  User.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(id) } },
    // look up account
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
    // look up payment history booking -> installments + coupons
    {
      $lookup: {
        from: 'bookings',
        let: { host: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$$host', '$host'] },
                  { $gt: ['$payedAmount', 0] },
                  {
                    $or: [
                      { $eq: ['$status', 'completed'] },
                      { $eq: ['$status', 'confirmed'] },
                    ],
                  },
                ],
              },
            },
          },
          // lookup booking installments
          {
            $lookup: {
              from: 'installments',
              let: { bookingId: '$_id' },
              pipeline: [
                { $match: { $expr: { $eq: ['$$bookingId', '$booking'] } } },
              ],
              as: 'installments',
            },
          },
          // lookup booking coupon transaction
          {
            $lookup: {
              from: 'coupons',
              let: { couponId: '$coupon' },
              pipeline: [
                { $match: { $expr: { $eq: ['$$couponId', '$_id'] } } },
                {
                  $project: {
                    transactions: 1,
                  },
                },
              ],
              as: 'couponTransactions',
            },
          },
          {
            $unwind: {
              path: '$couponTransactions',
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $project: {
              status: 1,
              installments: 1,
              couponTransactions: '$couponTransactions.transactions',
            },
          },
        ],
        as: 'paymentHistory',
      },
    },
    // look up withdrawal requests
    {
      $lookup: {
        from: 'withdrawrequests',
        localField: '_id',
        foreignField: 'user',
        as: 'withdrawalRequests',
      },
    },
    // look up complete bookings to get the hosted interns
    {
      $lookup: {
        from: 'bookings',
        let: { host: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$$host', '$host'] },
                  { $eq: ['$status', 'completed'] },
                ],
              },
            },
          },
          {
            $group: {
              _id: '$intern',
            },
          },
        ],
        as: 'internsHosted',
      },
    },
    // look up pending payment (confirmed bookings that have payedamount)
    {
      $lookup: {
        from: 'bookings',
        let: { host: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$$host', '$host'] },
                  { $eq: ['$status', 'confirmed'] },
                ],
              },
            },
          },
          {
            $project: {
              hostRatioPayedAmount: { $multiply: ['$payedAmount', 0.45] },
            },
          },
        ],
        as: 'confirmedBookings',
      },
    },
    {
      $project: {
        account: 1,
        paymentHistory: 1,
        withdrawalRequests: 1,
        internsHosted: 1,
        confirmedBookings: 1,
        pendingPayment: { $sum: '$confirmedBookings.hostRatioPayedAmount' },
      },
    },
  ]);

module.exports = getHostPaymentsInfo;
