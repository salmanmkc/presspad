const mongoose = require('mongoose');

const User = require('../../models/User');

/**
 * get intern dashboard information
 * [ intern bookings, notifications and installments ]
 * @param {string} id the Intern Id
 * @returns {promise} not fully fledge
 */
const internDashboard = id =>
  User.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(id) } },
    // Intern profile
    {
      $lookup: {
        from: 'profiles',
        let: { intern: '$_id' },
        pipeline: [{ $match: { $expr: { $eq: ['$$intern', '$user'] } } }],
        as: 'profile',
      },
    },
    {
      $unwind: { path: '$profile', preserveNullAndEmptyArrays: true },
    },
    // reviews
    {
      $lookup: {
        from: 'reviews',
        let: { intern: '$_id' },

        pipeline: [
          {
            $match: { $expr: { $eq: ['$$intern', '$to'] } },
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
    // Intern notification
    {
      $lookup: {
        from: 'notifications',
        let: { intern: '$_id' },
        pipeline: [
          { $match: { $expr: { $eq: ['$$intern', '$user'] } } },
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
          {
            $sort: {
              createdAt: 1,
            },
          },
          { $limit: 3 },
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
      $unwind: { path: '$account', preserveNullAndEmptyArrays: true },
    },
    // Intern installments
    {
      $lookup: {
        from: 'installments',
        let: { intern: '$_id' },
        pipeline: [
          { $match: { $expr: { $eq: ['$$intern', '$intern'] } } },

          {
            $sort: {
              dueDate: 1,
            },
          },
          // { $limit: 3 },
        ],
        as: 'installments',
      },
    },
    {
      $project: {
        name: 1,
        reviews: 1,
        notifications: 1,
        profileCompleted: '$profile.isCompleted',
        installments: 1,
      },
    },
  ]);

module.exports = internDashboard;
