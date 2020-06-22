const mongoose = require('mongoose');
const Booking = require('../../models/Booking');
const { bookingStatuses } = require('../../../constants');

const getHostNextBooking = hostId =>
  Booking.aggregate([
    {
      $match: {
        host: mongoose.Types.ObjectId(hostId),
        status: { $in: [bookingStatuses.confirmed] },
        startDate: { $gte: new Date() },
      },
    },
    {
      $sort: {
        startDate: 1,
      },
    },
  ]);

module.exports = getHostNextBooking;
