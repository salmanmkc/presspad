const mongoose = require('mongoose');

const User = require('../../models/User');

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
      $unwind: {
        path: '$profile',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        profileCompleted: '$profile.isCompleted',
        name: 1,
        acceptAutomatically: 1,
      },
    },
    // listing
    {
      $lookup: {
        from: 'listings',
        let: { host: '$_id' },
        pipeline: [
          { $match: { $expr: { $eq: ['$$host', '$user'] } } },

          {
            $project: {
              availableDates: '$availableDates',
            },
          },
        ],
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
            $lookup: {
              from: 'users',
              localField: 'from',
              foreignField: '_id',
              as: 'user',
            },
          },
          {
            $unwind: '$user',
          },
          {
            $lookup: {
              from: 'profiles',
              localField: 'from',
              foreignField: 'user',
              as: 'profile',
            },
          },
          {
            $unwind: '$profile',
          },
          {
            $project: {
              name: '$user.name',
              rate: '$rating',
              jobTitle: '$profile.jobTitle',
              message: '$message',
            },
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
  ]);

module.exports = hostDashboard;
