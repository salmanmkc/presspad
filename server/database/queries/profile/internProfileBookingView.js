const mongoose = require('mongoose');
const User = require('../../models/User');

module.exports = internId => {
  const profileProject = {
    phoneNumber: 1,
    gender: 1,
    school: 1,
    hometown: 1,
    interests: 1,
    bio: 1,
  };

  return User.aggregate([
    // match user
    {
      $match: {
        _id: mongoose.Types.ObjectId(internId),
      },
    },
    // lookup profile
    {
      $lookup: {
        from: 'profiles',
        let: { id: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ['$user', '$$id'] },
            },
          },
          {
            $project: profileProject,
          },
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

    // lookup reviews
    {
      $lookup: {
        from: 'reviews',
        let: { user_id: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $or: [
                  { $eq: ['$to', '$$user_id'] },
                  { $eq: ['$from', '$$user_id'] },
                ],
              },
            },
          },
          {
            $lookup: {
              from: 'users',
              let: { from: '$from' },
              pipeline: [
                {
                  $match: {
                    $expr: { $eq: ['$_id', '$$from'] },
                  },
                },
                {
                  $project: {
                    name: 1,
                    email: 1,
                  },
                },
              ],
              as: 'from',
            },
          },
          {
            $addFields: {
              from: { $arrayElemAt: ['$from', 0] },
            },
          },
        ],
        as: 'reviews',
      },
    },
    {
      $addFields: { 'profile.reviews': '$reviews' },
    },
    {
      $replaceRoot: {
        newRoot: '$profile',
      },
    },
  ]);
};
