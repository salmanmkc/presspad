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
      $unwind: {
        path: '$profile',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        profileCompleted: '$profile.isCompleted',
        name: 1,
      },
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
