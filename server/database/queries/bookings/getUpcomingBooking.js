const mongoose = require('mongoose');
const Booking = require('../../models/Booking');
const { bookingStatuses } = require('../../../constants');

const getUpcomingBooking = ({ userId, role }) =>
  Booking.aggregate([
    {
      $match: {
        [role]: mongoose.Types.ObjectId(userId),
        status: {
          $in: [bookingStatuses.confirmed, bookingStatuses.accepted],
        },
        startDate: { $gte: new Date() },
      },
    },
    {
      $sort: {
        startDate: 1,
      },
    },
    { $limit: 1 },
    // get user data of other user
    {
      $lookup: {
        from: 'users',
        localField: role === 'intern' ? 'host' : 'intern',
        foreignField: '_id',
        as: 'user',
      },
    },
    // get profile data of other user
    {
      $lookup: {
        from: 'profiles',
        localField: role === 'intern' ? 'host' : 'intern',
        foreignField: 'user',
        as: 'profile',
      },
    },
    {
      $project: {
        _id: 1,
        startDate: 1,
        endDate: 1,
        price: 1,
        status: 1,
        withUser: { $arrayElemAt: ['$user.name', 0] },
        withUserRole: { $arrayElemAt: ['$user.role', 0] },
        withUserBio: { $arrayElemAt: ['$profile.bio', 0] },
        withUserInterestsIntern: '$profile.interests',
        withUserInterestsHost: '$profile.areasOfInterest',
      },
    },
  ]);

module.exports = getUpcomingBooking;
