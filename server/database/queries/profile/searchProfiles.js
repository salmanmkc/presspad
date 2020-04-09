const Listing = require('../../models/Listing');

module.exports.searchProfiles = ({
  city,
  startDate,
  endDate,
  acceptAutomatically,
}) => {
  const cityMatch = city ? { 'address.city': new RegExp(city, 'i') } : {};
  const acceptAutomaticallyMatch =
    acceptAutomatically === true || acceptAutomatically === false
      ? {
          'user.acceptAutomatically': !!acceptAutomatically,
        }
      : {};

  const startDateFilter = startDate
    ? {
        $lte: ['$$availableDate.startDate', new Date(startDate)],
      }
    : true;

  const endDateFilter = endDate
    ? {
        $gte: ['$$availableDate.endDate', new Date(endDate)],
      }
    : true;

  const basicPipelines = [
    {
      $match: cityMatch,
    },
    //  get the user id so we can link to the right profile
    {
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'user',
      },
    },
    {
      $unwind: '$user',
    },
    {
      $match: {
        ...acceptAutomaticallyMatch,
        // get any listings that match the city
        'availableDates.endDate': { $gte: new Date() },
      },
    },

    {
      $addFields: {
        userID: '$user._id',
      },
    },
    {
      $lookup: {
        from: 'profiles',
        localField: 'user._id',
        foreignField: 'user',
        as: 'profile',
      },
    },
    {
      $unwind: '$profile',
    },
    {
      $match: {
        'profile.verified': true,
      },
    },
    {
      $project: {
        availableDates: {
          $filter: {
            input: '$availableDates',
            as: 'availableDate',
            cond: {
              $and: [startDateFilter, endDateFilter],
            },
          },
        },
        address: 1,
        photos: 1,
        userID: 1,
        user: 1,
      },
    },
    {
      $addFields: {
        totalDates: { $size: '$availableDates' },
      },
    },
    // remove any listings that don't have any available dates within the range
    {
      $match: { totalDates: { $gt: 0 } },
    },
  ];

  return Listing.aggregate(basicPipelines);
};
