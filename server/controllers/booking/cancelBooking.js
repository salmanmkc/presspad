// add cancel flows here
const boom = require('boom');

// const {
//   cancelBookingBeforePayment,
// } = require('../../database/queries/bookings');
const {
  getBooking,
  cancelBookingBeforePaymentQuery,
} = require('../../database/queries/bookings');

const cancelBooking = async (req, res, next) => {
  const { id: bookingId } = req.params;
  const { role, _id: userId } = req.user;
  const { message, cancellingUserId } = req.body;
  try {
    console.log('reached controller', bookingId, role, userId, message);
    // check for role
    if (!['host', 'superhost', 'intern', 'admin'].includes(role)) {
      return next(boom.forbidden());
    }
    // check if all required parameters are present to update booking details
    if (!bookingId || message.length < 4 || !cancellingUserId) {
      return next(boom.badData());
    }

    let cancelledBooking;
    // check if booking is valid and if cancellation before payment
    const booking = await getBooking(bookingId);

    const canCancelDirectly =
      ['accepted', 'confirmed', 'awaiting admin', 'pending'].includes(
        booking.status,
      ) && booking.payedAmount === 0;

    if (canCancelDirectly) {
      cancelledBooking = await cancelBookingBeforePaymentQuery({
        bookingId,
        message,
        cancellingUserId,
      });
    }
    console.log('cancelled', cancelledBooking);
    return res.json({});

    // run query to update booking status
  } catch (err) {
    return next(boom.badImplementation(err));
  }
};

module.exports = cancelBooking;
