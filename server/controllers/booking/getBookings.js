const boom = require('boom');

const {
  getCurrentBooking,
  getUpcomingBooking,
  getUserBookingRequests,
  getUserPreviousBookings,
} = require('../../database/queries/bookings');

const getBookingHistoryApi = async (req, res, next) => {
  const userId = req.user.id;
  const { role } = req.user;

  try {
    const [
      currentBooking,
      nextUpcomingBooking,
      bookingRequests,
      previousBookings,
    ] = await Promise.all([
      getCurrentBooking({ userId, role }),
      getUpcomingBooking({ userId, role }),
      getUserBookingRequests({ userId, role }),
      getUserPreviousBookings({ userId, role }),
    ]);

    return res.json({
      currentBooking,
      nextUpcomingBooking,
      bookingRequests,
      previousBookings,
    });
  } catch (err) {
    return next(boom.badImplementation(err));
  }
};

module.exports = getBookingHistoryApi;
