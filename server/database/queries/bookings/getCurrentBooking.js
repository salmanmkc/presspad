const mongoose = require('mongoose');
const Booking = require('../../models/Booking');
const { bookingStatuses } = require('../../../constants');

const getCurrentBooking = ({ userId, role }) =>
  Booking.aggregate([
    {
      $match: {
        [role]: mongoose.Types.ObjectId(userId),
        status: {
          $in: [bookingStatuses.confirmed, bookingStatuses.accepted],
        },
        startDate: { $lte: new Date() },
        endDate: {
          $gte: new Date(),
        },
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
        withUserRole: { $arrayElemAt: ['$user.role', 0] },
      },
    },
  ]);

module.exports = getCurrentBooking;
