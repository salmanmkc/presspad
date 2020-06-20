const getOldBookings = require('../../../database/queries/bookings/getOldBookings');
const Booking = require('../../../database/models/Booking');
const { bookingStatuses } = require('../../../constants');

module.exports = async () => {
  const oldBookings = await getOldBookings();

  if (!oldBookings.length) return null;

  const oldBookingsIds = oldBookings.map(booking => booking._id);

  return Booking.updateMany(
    { _id: { $in: oldBookingsIds } },
    {
      status: bookingStatuses.cancelled,
      cancelledBy: null,
    },
  );
};
