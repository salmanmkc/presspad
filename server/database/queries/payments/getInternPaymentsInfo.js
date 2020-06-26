const mongoose = require('mongoose');

const { User } = require('../../models');
const { bookingStatuses } = require('../../../constants');

const getInternPaymentsInfo = id =>
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
    // look up unpaid payments - bookings
    {
      $lookup: {
        from: 'bookings',
        let: { internId: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$$internId', '$intern'] },
                  { $gt: ['$price', 0] },
                  {
                    $or: [{ $eq: ['$status', bookingStatuses.confirmed] }],
                  },
                ],
              },
            },
          },
          // lookup booking installments
          {
            $lookup: {
              from: 'installments',
              let: { bookingId: '$_id', couponId: '$coupon' },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        { $eq: ['$$bookingId', '$booking'] },
                        { $lte: ['$transaction', null] },
                      ],
                    },
                  },
                },
                {
                  $addFields: { coupon: '$$couponId' },
                },
              ],
              as: 'installments',
            },
          },
          // lookup host name
          {
            $lookup: {
              from: 'users',
              localField: 'host',
              foreignField: '_id',
              as: 'host',
            },
          },
          {
            $unwind: {
              path: '$host',
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $project: {
              _id: 0,
              startDate: 1,
              host: '$host.name',
              bookingId: '$_id',
              installments: 1,
            },
          },
        ],
        as: 'unpaidPayments',
      },
    },
    // look up payments history paid installments
    {
      $lookup: {
        from: 'installments',
        let: { internId: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$$internId', '$intern'] },
                  { $gt: ['$transaction', null] },
                ],
              },
            },
          },
        ],
        as: 'paymentHistory',
      },
    },
    {
      $project: {
        account: 1,
        unpaidPayments: 1,
        paymentHistory: 1,
      },
    },
  ]);

module.exports = { getInternPaymentsInfo };
