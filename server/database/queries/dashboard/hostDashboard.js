const mongoose = require('mongoose');

const User = require('../../models/User');
const { bookingStatuses } = require('../../../constants');

/**
 * get host dashboard information
 * [ host bookings, notifications and account details ]
 * @param {string} id the Host Id
 * @returns {promise} not fully fledge
 */
const hostDashboard = id =>
  User.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(id) } },
    // Host profile
    {
      $lookup: {
        from: 'profiles',
        let: { host: '$_id' },
        pipeline: [{ $match: { $expr: { $eq: ['$$host', '$user'] } } }],
        as: 'profile',
      },
    },
    {
      $unwind: { path: '$profile', preserveNullAndEmptyArrays: true },
    },
    // listing
    {
      $lookup: {
        from: 'listings',
        let: { host: '$_id' },
        pipeline: [{ $match: { $expr: { $eq: ['$$host', '$user'] } } }],
        as: 'listing',
      },
    },
    {
      $unwind: { path: '$listing', preserveNullAndEmptyArrays: true },
    },
    {
      $lookup: {
        from: 'withdrawrequests',
        localField: '_id',
        foreignField: 'user',
        as: 'withdrawRequests',
      },
    },
    // reviews
    {
      $lookup: {
        from: 'reviews',
        let: { host: '$_id' },
        pipeline: [
          {
            $match: { $expr: { $eq: ['$$host', '$to'] } },
          },
          {
            $sort: {
              createdAt: 1,
            },
          },
          { $limit: 2 },
        ],
        as: 'reviews',
      },
    },
    // host notification
    {
      $lookup: {
        from: 'notifications',
        let: { host: '$_id' },
        pipeline: [
          { $match: { $expr: { $eq: ['$$host', '$user'] } } },
          {
            $sort: {
              createdAt: 1,
            },
          },
          { $limit: 3 },
          // SecondParty name
          {
            $lookup: {
              from: 'users',
              let: { secondParty: '$secondParty' },
              pipeline: [
                { $match: { $expr: { $eq: ['$$secondParty', '$_id'] } } },
                {
                  $project: { name: 1 },
                },
              ],
              as: 'secondParty',
            },
          },
          {
            $unwind: { path: '$secondParty', preserveNullAndEmptyArrays: true },
          },
        ],
        as: 'notifications',
      },
    },

    // host bookings
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
                  // { $ne: ['$status', bookingStatuses.cancelled] },
                  { $ne: ['$status', bookingStatuses.rejectedByAdmin] },
                  { $ne: ['$status', bookingStatuses.awaitingAdmin] },
                ],
              },
            },
          },
          // intern name
          {
            $lookup: {
              from: 'users',
              let: { intern: '$intern' },
              pipeline: [
                { $match: { $expr: { $eq: ['$$intern', '$_id'] } } },
                // host profile
                {
                  $lookup: {
                    from: 'profiles',
                    let: { intern: '$_id' },
                    pipeline: [
                      { $match: { $expr: { $eq: ['$$intern', '$user'] } } },
                    ],
                    as: 'profile',
                  },
                },
                {
                  $unwind: {
                    path: '$profile',
                    preserveNullAndEmptyArrays: true,
                  },
                },

                {
                  $project: {
                    password: 0,
                  },
                },
              ],
              as: 'intern',
            },
          },
          {
            $unwind: { path: '$intern', preserveNullAndEmptyArrays: true },
          },
        ],
        as: 'bookings',
      },
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
      $lookup: {
        from: 'withdrawrequests',
        localField: '_id',
        foreignField: 'user',
        as: 'withdrawRequests',
      },
    },
    {
      $unwind: { path: '$account', preserveNullAndEmptyArrays: true },
    },
    {
      $project: {
        password: 0,
      },
    },
  ]);

module.exports = hostDashboard;
