const boom = require('boom');

const { rejectBookings } = require('../../services/bookings');
const { updateRespondingData } = require('../../database/queries/user');

const rejectBooking = async (req, res, next) => {
  const { id: bookingId } = req.params;
  const { rejectReason } = req.body;
  const { role, _id: hostId } = req.user;
  try {
    // check for role
    if (role !== 'host' && role !== 'superhost') {
      return next(boom.forbidden());
    }

    const updatedBooking = await rejectBookings(
      bookingId,
      hostId,
      rejectReason,
    );

    // update respondingData
    const { createdAt, confirmOrRejectDate } = updatedBooking[0];
    const respondingTimeInMs = confirmOrRejectDate - createdAt;
    await updateRespondingData(hostId, respondingTimeInMs);

    return res.json({});
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};

module.exports = rejectBooking;
