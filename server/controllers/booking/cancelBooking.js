const boom = require('boom');

const {
  getBooking,
  cancelBookingBeforePaymentQuery,
} = require('../../database/queries/bookings');

const cancelBooking = async (req, res, next) => {
  const { id: bookingId } = req.params;
  const { role } = req.user;
  const { message, cancellingUserId } = req.body;
  try {
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
        booking[0].status,
      ) && booking[0].payedAmount === 0;

    if (canCancelDirectly) {
      cancelledBooking = await cancelBookingBeforePaymentQuery({
        bookingId,
        message,
        cancellingUserId,
      });
    }

    if (cancelledBooking) {
      return res.json(cancelledBooking);
    }

    // run query to update booking status
  } catch (err) {
    return next(boom.badImplementation(err));
  }
};

module.exports = cancelBooking;
