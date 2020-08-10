const mongoose = require('mongoose');
const User = require('../../models/User');
const Booking = require('../../models/Booking');
const { bookingStatuses } = require('../../../constants');

exports.hostProfileData = (hostId, isPrivate = false) => {
  const listingProject = {
    profile: 1,
    'listing._id': 1,
    'listing.photos': 1,
    'listing.availableDates': 1,
    'listing.accommodationChecklist': 1,
    'listing.neighbourhoodDescription': 1,
    'listing.otherInfo': 1,
    'listing.address': 1,
    reviews: 1,
    respondingTime: 1,
    respondedRequests: 1,
    referred: { $size: '$referred' },
    referredBy: 1,
  };

  const profileProject = {
    jobTitle: 1,
    organisation: 1,
    bio: 1,
    hostingReasonAnswer: 1,
    mentoringExperienceAnswer: 1,
    industryExperienceAnswer: 1,
    backgroundAnswer: 1,
    profileImage: 1,
    school: 1,
    hometown: 1,
    gender: 1,
    badge: 1,
    interests: 1,
    workingArea: 1,
    phoneNumber: 1,
  };

  if (isPrivate) {
    profileProject.workingArea = 1;
    listingProject.name = 1;
  }

  return User.aggregate([
    // match user
    {
      $match: {
        _id: mongoose.Types.ObjectId(hostId),
        role: 'host',
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
    // lookup listings
    {
      $lookup: {
        from: 'listings',
        localField: '_id',
        foreignField: 'user',
        as: 'listing',
      },
    },
    {
      $unwind: {
        path: '$listing',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: 'reviews',
        let: { user_id: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ['$to', '$$user_id'] },
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
                        $project: {
                          jobTitle: 1,
                        },
                      },
                    ],
                    as: 'profile',
                  },
                },
                {
                  $addFields: {
                    profile: { $arrayElemAt: ['$profile', 0] },
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
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: 'referredBy',
        as: 'referred',
      },
    },
    {
      $project: listingProject,
    },
  ]);
};

exports.getConfirmedBooking = (internId, hostId) =>
  Booking.findOne({
    intern: internId,
    host: hostId,
    status: { $in: [bookingStatuses.confirmed, bookingStatuses.completed] },
  });

exports.getListingActiveBookings = listingId =>
  Booking.find({
    listing: listingId,
    $or: [
      {
        status: bookingStatuses.confirmed,
      },
      {
        status: bookingStatuses.accepted,
      },
    ],
  });
