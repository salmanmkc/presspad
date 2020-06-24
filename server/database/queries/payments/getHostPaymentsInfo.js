const mongoose = require('mongoose');

const { User, Booking } = require('../../models');
// const { bookingStatuses } = require('../../../constants');

const getHostPendingPayments = async id => {
  const data = await Booking.aggregate([
    {
      $match: {
        $expr: {
          $and: [
            { $eq: ['$host', id] },
            { $eq: ['$status', 'confirmed'] },
            { $gt: ['$payedAmount', 0] },
            { $eq: ['$moneyGoTo', 'host'] },
          ],
        },
      },
    },
    {
      $project: {
        hostRatioPayedAmount: { $multiply: ['$payedAmount', 0.45] },
      },
    },
  ]);

  const pendingPayments = data.reduce(
    (acc, curr) => acc + curr.hostRatioPayedAmount,
    0,
  );
  return pendingPayments;
};

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
                {
                  $project: {
                    dueDate: 1,
                    transaction: 1,
                    hostRatioAmount: { $multiply: ['$amount', 0.45] },
                  },
                },
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
                    hostRatioAmount: { $multiply: ['$amount', 0.45] },
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
          // lookup intern name
          {
            $lookup: {
              from: 'users',
              localField: 'intern',
              foreignField: '_id',
              as: 'intern',
            },
          },
          {
            $unwind: {
              path: '$intern',
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $project: {
              _id: 0,
              status: 1,
              startDate: 1,
              endDate: 1,
              intern: '$intern.name',
              bookingId: '$_id',
              installments: 1,
              hostInstallmentsRatioAmount: {
                $sum: '$installments.hostRatioAmount',
              },
              // couponTransactions: '$couponTransactions.transactions',
              hostcouponTransactionsRatioAmount: {
                $multiply: [
                  { $sum: '$couponTransactions.transactions.amount' },
                  0.45,
                ],
              },
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
                  { $gt: ['$payedAmount', 0] },
                  { $eq: ['$moneyGoTo', 'host'] },
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

module.exports = { getHostPaymentsInfo, getHostPendingPayments };
