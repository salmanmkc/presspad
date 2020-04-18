const boom = require('boom');
const pubSub = require('./../../pubSub');

const {
  updateBookingByID,
  adminRejectBookingById,
  getBookingWithUsers,
} = require('../../database/queries/bookings');
const { registerNotification } = require('../../services/notifications');

const adminReviewsBooking = async (req, res, next) => {
  const { booking, status, message } = req.body;
  const { _id: bookingID } = booking;
  const { intern, host } = await getBookingWithUsers(bookingID);

  try {
    // if rejected, create a notification for intern
    if (status === 'rejected by admin') {
      const updatedBookingRequest = await adminRejectBookingById(
        bookingID,
        message,
      );

      const notification = {
        private: true,
        user: updatedBookingRequest.intern,
        secondParty: req.user,
        type: 'stayRejected',
        booking: bookingID,
        message,
      };

      const promiseArray = [registerNotification(notification)];

      // EMAIL TO GO HERE - MIGHT BE ABLE TO USE REJECTBOOKING.JS EMAIL
      pubSub.emit(pubSub.events.BOOKING_REJECTED, {
        bookingId: bookingID,
        intern,
        host,
        rejectedBy: 'admin',
      });

      await Promise.all(promiseArray);
      return res.json({ success: 'Booking request successfully updated' });
    }

    await updateBookingByID(bookingID, status);

    // Notification to let host know they have a booking request
    const notification = {
      user: host._id,
      secondParty: intern._id,
      type: 'stayRequest',
      private: false,
      booking: bookingID,
    };

    pubSub.emit(pubSub.events.BOOKING_ACCEPTED_BY_ADMIN, {
      bookingId: bookingID,
      intern,
      host,
    });

    await registerNotification(notification);

    return res.json({ success: 'Booking request successfully updated' });
  } catch (err) {
    return next(boom.badImplementation(err));
  }
};

module.exports = adminReviewsBooking;
