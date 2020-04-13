const boom = require('boom');

const {
  updateBookingByID,
  adminRejectBookingById,
} = require('../../database/queries/bookings');
const { registerNotification } = require('../../services/notifications');

const adminReviewsBooking = async (req, res, next) => {
  const { booking, status, message } = req.body;
  const { _id: bookingID, host, intern } = booking;

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
      // if (process.env.NODE_ENV === 'production') {
      //     promiseArray.push(requestRejectedToIntern(bookingDetails));
      //   }

      await Promise.all(promiseArray);
      return res.json({ success: 'Booking request successfully updated' });
    }

    await updateBookingByID(bookingID, status);

    // Notification to let host know they have a booking request
    const notification = {
      user: host,
      secondParty: intern,
      type: 'stayRequest',
      private: false,
      booking: bookingID,
    };

    await registerNotification(notification);

    return res.json({ success: 'Booking request successfully updated' });
  } catch (err) {
    return next(boom.badImplementation(err));
  }
};

module.exports = adminReviewsBooking;
