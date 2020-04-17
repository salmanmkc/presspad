const boom = require('boom');

const { rejectBookings } = require('../../services/bookings');

const rejectBooking = async (req, res, next) => {
  const { id: bookingId } = req.params;
  const { rejectReason } = req.body;
  const { role, _id: hostId } = req.user;
  try {
    // check for role
    if (role !== 'host' && role !== 'superhost') {
      return next(boom.forbidden());
    }

    await rejectBookings(bookingId, hostId, rejectReason);

    return res.json({});
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};

module.exports = rejectBooking;
