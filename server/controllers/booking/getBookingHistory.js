const boom = require('boom');

const { getBookingHistory } = require('../../database/queries/bookings');

const getBookingHistoryApi = async (req, res, next) => {
  //   const currentUser = req.user.id;
  try {
    const activeBookings = await getBookingHistory();
    return res.json(activeBookings);
  } catch (err) {
    return next(boom.badImplementation(err));
  }
};

module.exports = getBookingHistoryApi;
