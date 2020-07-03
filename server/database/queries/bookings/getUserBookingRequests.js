const mongoose = require('mongoose');
const Booking = require('../../models/Booking');
const { bookingStatuses } = require('../../../constants');

// get all active bookings of user
const getUserBookingRequests = ({ userId, role }) =>
  Booking.aggregate([
    {
      $match: {
        [role]: mongoose.Types.ObjectId(userId),
        status: {
          $in:
            role === 'host'
              ? [bookingStatuses.pending]
              : [bookingStatuses.pending, bookingStatuses.awaitingAdmin],
        },
        // only get requests for future dates
        endDate: { $gte: new Date() },
      },
    },
    // newest bookings at top
    {
      $sort: {
        startDate: -1,
      },
    },
    // get user data of other user
    {
      $lookup: {
        from: 'users',
        localField: role === 'intern' ? 'host' : 'intern',
        foreignField: '_id',
        as: 'user',
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
      },
    },
  ]);

module.exports = getUserBookingRequests;
