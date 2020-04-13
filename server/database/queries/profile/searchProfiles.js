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
    ? [
        {
          $lte: [
            {
              $dateToString: {
                date: '$$availableDate.startDate',
                format: '%Y-%m-%d', // just compare between dates without time
              },
            },
            {
              $dateToString: {
                date: new Date(startDate),
                format: '%Y-%m-%d',
              },
            },
          ],
        },
        {
          $gte: [
            {
              $dateToString: {
                date: '$$availableDate.endDate',
                format: '%Y-%m-%d', // just compare between dates without time
              },
            },
            {
              $dateToString: {
                date: new Date(startDate),
                format: '%Y-%m-%d',
              },
            },
          ],
        },
      ]
    : [];

  const endDateFilter = endDate
    ? [
        {
          $gte: [
            {
              $dateToString: {
                date: '$$availableDate.endDate',
                format: '%Y-%m-%d',
              },
            },
            {
              $dateToString: {
                date: new Date(endDate),
                format: '%Y-%m-%d',
              },
            },
          ],
        },
        {
          $lte: [
            {
              $dateToString: {
                date: '$$availableDate.startDate',
                format: '%Y-%m-%d',
              },
            },
            {
              $dateToString: {
                date: new Date(endDate),
                format: '%Y-%m-%d',
              },
            },
          ],
        },
      ]
    : [];

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
              $and: [...startDateFilter, ...endDateFilter],
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
