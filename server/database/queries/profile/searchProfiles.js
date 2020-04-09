const Listing = require('../../models/Listing');

module.exports.searchProfiles = ({ city, startDate, endDate }) => {
  const basicPipelines = [
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
  ];

  const project = awithAvailableDates => {
    const availableDates = {
      $filter: {
        input: '$availableDates',
        as: 'availableDate',
        cond: {
          $and: [
            { $gte: ['$$availableDate.endDate', new Date(startDate)] },
            { $lte: ['$$availableDate.startDate', new Date(endDate)] },
          ],
        },
      },
    };
    const basicProject = {
      $project: {
        address: 1,
        photos: 1,
        userID: 1,
      },
    };

    if (awithAvailableDates) basicProject.availableDates = availableDates;
    return basicProject;
  };

  // if only city get all listings that match that city
  if (!startDate && !endDate && city) {
    console.log(1);
    return Listing.aggregate([
      {
        $match: { 'address.city': new RegExp(city, 'i') },
      },
      //  get the user id so we can link to the right profile
      ...basicPipelines,
      project(),
    ]);
  }

  if (!startDate && !endDate && !city) {
    console.log(2);
    return Listing.aggregate([
      //  get the user id so we can link to the right profile
      ...basicPipelines,
      project(),
    ]);
  }
  if (!city) {
    console.log(3);

    // if only dates get all listing that match those dates
    return Listing.aggregate([
      // get any listings that have an end date later than today
      {
        $match: { 'availableDates.endDate': { $gte: new Date() } },
      },
      //  get the user id so we can link to the right profile
      ...basicPipelines,
      //  filter the availableDates so only availableDate objects within the time range remain
      project(true),
      {
        $addFields: {
          totalDates: { $size: '$availableDates' },
        },
      },
      // remove any listings that don't have any available dates within the range
      {
        $match: { totalDates: { $gt: 0 } },
      },
    ]);
  }

  // otherwise find those that match city AND dates
  return Listing.aggregate([
    // get any listings that match the city
    {
      $match: { 'address.city': new RegExp(city, 'i') },
    },
    // get any listings that have an end date later than today
    {
      $match: { 'availableDates.endDate': { $gte: new Date() } },
    },
    //  get the user id so we can link to the right profile
    ...basicPipelines,
    //  filter the availableDates so only availableDate objects within the time range remain
    project(true),
    {
      $addFields: {
        totalDates: { $size: '$availableDates' },
      },
    },
    // remove any listings that don't have any available dates within the range
    {
      $match: { totalDates: { $gt: 0 } },
    },
  ]);
};
