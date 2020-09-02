const boom = require('boom');
const pubSub = require('../../pubSub');

const {
  getBooking,
  cancelBookingBeforePaymentQuery,
  makeCancellationRequest,
} = require('../../database/queries/bookings');
const { registerNotification } = require('../../services/notifications');

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
    let notification;
    // check if booking is valid and if cancellation before payment

    const booking = await getBooking(bookingId);
    const { status, paidAmount } = booking[0];

    const canCancelDirectly =
      ['accepted', 'confirmed', 'awaiting admin', 'pending'].includes(status) &&
      paidAmount === 0;

    const canCancelAfterPayment =
      paidAmount > 0 && ['accepted', 'confirmed'].includes(status);
    // run query to update booking
    if (canCancelDirectly) {
      cancelledBooking = await cancelBookingBeforePaymentQuery({
        bookingId,
        cancellingUserMessage,
        cancellingUserId,
      });

      notification = [
        // notify Intern
        {
          user: cancelledBooking.intern,
          secondParty: cancelledBooking.host,
          type: 'cancelledBeforePayments',
          booking: bookingId,
        },
        // notify Host
        {
          user: cancelledBooking.host,
          secondParty: cancelledBooking.intern,
          type: 'cancelledBeforePayments',
          booking: bookingId,
        },
      ];
      // emails for booking before payment
      pubSub.emit(pubSub.events.booking.CANCELLED_BY_USER, {
        bookingId,
        role,
        type: 'beforePayment',
      });
    } else if (canCancelAfterPayment) {
      cancelledBooking = await makeCancellationRequest({
        bookingId,
        cancellingUserMessage,
        cancellingUserId,
      });

      notification = [
        // notify the user who request the cancellation
        {
          user: userId,
          type: 'requestCancelAfterPayments',
          booking: bookingId,
          private: true,
        },
      ];
      // emails for booking cancellation request after payment
      pubSub.emit(pubSub.events.booking.CANCELLED_BY_USER, {
        bookingId,
        role,
        type: 'afterPayment',
      });
    }

    if (cancelledBooking) {
      if (notification) {
        await registerNotification(notification);
      }
      return res.json(cancelledBooking);
    }

    return next(boom.badImplementation('booking cancellation error'));
  } catch (err) {
    return next(boom.badImplementation(err));
  }
};

module.exports = cancelBooking;
