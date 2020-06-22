const mongoose = require('mongoose');
const Booking = require('../../models/Booking');
const { bookingStatuses } = require('../../../constants');

const getInternNextBooking = internId =>
  Booking.aggregate([
    {
      $match: {
        intern: mongoose.Types.ObjectId(internId),
        status: bookingStatuses.confirmed,
        startDate: { $gte: new Date() },
      },
    },
    {
      $sort: {
        startDate: 1,
      },
    },
  ]);

module.exports = getInternNextBooking;
