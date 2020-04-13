const boom = require('boom');

const { getActiveBookings } = require('../../database/queries/bookings');

const getActiveBookingsApi = async (req, res, next) => {
  //   const currentUser = req.user.id;
  try {
    const activeBookings = await getActiveBookings();
    return res.json(activeBookings);
  } catch (err) {
    return next(boom.badImplementation(err));
  }
};

module.exports = getActiveBookingsApi;
