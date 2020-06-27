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
          $in: [
            bookingStatuses.pending,
            bookingStatuses.awaitingAdmin,
            bookingStatuses.confirmed,
            bookingStatuses.accepted,
          ],
        },
        // only get requests for future dates
        startDate: { $gt: new Date() },
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
