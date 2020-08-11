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
        from: 'bookings',
        let: { listingId: '$listing._id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$listing', '$$listingId'] },
                  {
                    $or: [
                      { $eq: ['$status', 'accepted'] },
                      { $eq: ['$status', 'confirmed'] },
                      { $eq: ['$status', 'pending'] },
                    ],
                  },
                ],
              },
            },
          },
          {
            $sort: { startDate: 1 },
          },
        ],
        as: 'liveBookings',
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
        'listing.address': 1,
        'profile.verified': 1,
        'profile._id': 1,
        'profile.DBSCheck': 1,
        'profile.awaitingReview': 1,
        'profile.awaitingReviewDate': 1,
        'profile.firstVerified': 1,
        'profile.houseViewingDate': 1,
        totalIncome: { $arrayElemAt: ['$account.income', 0] },
        currentBalance: { $arrayElemAt: ['$account.currentBalance', 0] },
        // look up from bookings:
        // // any that were confirmed
        // // any that started before today's date
        internsHosted: { $size: '$uniqueInternBookings' },
        nextLiveBooking: { $arrayElemAt: ['$liveBookings', 0] },
      },
    },
  ]);
