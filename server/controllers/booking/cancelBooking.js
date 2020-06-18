const boom = require('boom');

const {
  getBooking,
  cancelBookingBeforePaymentQuery,
} = require('../../database/queries/bookings');

const cancelBooking = async (req, res, next) => {
  const { id: bookingId } = req.params;
  const { role, id: userId } = req.user;
  const { cancellingUserMessage, cancellingUserId } = req.body;

  try {
    // check if all required parameters are present to update booking details
    if (!bookingId || !cancellingUserMessage || !cancellingUserId) {
      return next(boom.badData());
    }

    // check for valid role and if cancelling user is the same as logged in user
    if (
      !['host', 'superhost', 'intern', 'admin'].includes(role) ||
      !(userId === cancellingUserId)
    ) {
      return next(boom.forbidden());
    }

    let cancelledBooking;
    // check if booking is valid and if cancellation before payment

    const booking = await getBooking(bookingId);
    const { status, payedAmount } = booking[0];

    const canCancelDirectly =
      ['accepted', 'confirmed', 'awaiting admin', 'pending'].includes(status) &&
      payedAmount === 0;
    // run query to update booking
    if (canCancelDirectly) {
      cancelledBooking = await cancelBookingBeforePaymentQuery({
        bookingId,
        cancellingUserMessage,
        cancellingUserId,
      });
    }
    // TODO add logic to deal with cancellation after payment

    if (cancelledBooking) {
      return res.json(cancelledBooking);
    }

    return next(boom.badImplementation());
  } catch (err) {
    return next(boom.badImplementation(err));
  }
};

module.exports = cancelBooking;
