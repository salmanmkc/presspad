const User = require('../../models/User');

module.exports.getAllHostStats = () =>
  User.aggregate([
    // get all hosts
    {
      $match: { role: 'host' },
    },
    // look up listing for that user
    {
      $lookup: {
        from: 'listings',
        localField: '_id',
        foreignField: 'user',
        as: 'listing',
      },
    },
    // look up profile for that user
    {
      $lookup: {
        from: 'profiles',
        localField: '_id',
        foreignField: 'user',
        as: 'profile',
      },
    },
    {
      $unwind: '$listing',
    },
    {
      $lookup: {
        from: 'bookings',
        let: { listingId: '$listing._id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$listing', '$$listingId'] },
                  { $lte: ['$startDate', new Date()] },
                  {
                    $or: [
                      { $eq: ['$status', 'confirmed'] },
                      { $eq: ['$status', 'completed'] },
                    ],
                  },
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
        as: 'uniqueInternBookings',
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
      $project: {
        _id: 1,
        name: 1,
        email: 1,
        'listing.hometown': 1,
        'profile.verified': 1,
        'profile._id': 1,
        'profile.DBSCheck': 1,
        totalIncome: { $arrayElemAt: ['$account.income', 0] },
        currentBalance: { $arrayElemAt: ['$account.currentBalance', 0] },
        // look up from bookings:
        // // any that were confirmed
        // // any that started before today's date
        internsHosted: { $size: '$uniqueInternBookings' },
      },
    },
  ]);
