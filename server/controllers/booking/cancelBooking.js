// add cancel flows here
const boom = require('boom');

const {
  cancelBookingBeforePayment,
} = require('../../database/queries/bookings');

const cancelBooking = async (req, res, next) => {
  try {
    console.log('reached controller');
  } catch (err) {
    return next(boom.badImplementation(err));
  }
};

module.exports = cancelBooking;
