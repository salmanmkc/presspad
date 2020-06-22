const Booking = require('../../models/Booking');
const { bookingStatuses } = require('../../../constants');

module.exports = bookingsIds =>
  Booking.updateMany(
    { _id: { $in: bookingsIds } },
    { status: bookingStatuses.completed },
  );
