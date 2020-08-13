const boom = require('boom');
const pubSub = require('../../pubSub');

const { getUserById } = require('../../database/queries/user');

const {
  updateBookingByID,
  adminRejectBookingById,
  getBookingWithUsers,
} = require('../../database/queries/bookings');
const { registerNotification } = require('../../services/notifications');

const adminReviewsBooking = async (req, res, next) => {
  const { booking, status, message } = req.body;
  const { _id: bookingID } = booking;
  console.log('BOK', booking, bookingID);
  const { intern, host } = await getBookingWithUsers(bookingID);

  const userDetails = await getUserById(host, true);
  const { acceptAutomatically } = userDetails;

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
        secondParty: req.user._id,
        type: 'stayRejected',
        booking: bookingID,
        message,
      };

      const promiseArray = [registerNotification(notification)];

      // EMAIL TO GO HERE - MIGHT BE ABLE TO USE REJECTBOOKING.JS EMAIL
      pubSub.emit(pubSub.events.booking.REJECTED, {
        bookingId: bookingID,
        intern,
        host,
        rejectedBy: 'admin',
      });

      await Promise.all(promiseArray);
      return res.json({ success: 'Booking request successfully updated' });
    }

    if (acceptAutomatically) {
      await updateBookingByID(bookingID, 'accepted', true);

      // Notification to let host know they have a confirmed request
      const hostNotification = {
        user: host._id,
        secondParty: req.user._id,
        type: 'automaticStayRequest',
        booking: bookingID,
        private: true,
        message: 'You have a new guest staying with you',
      };

      // Notification to let intern know their request is accepted
      const internNotification = {
        user: intern._id,
        secondParty: req.user._id,
        type: 'stayApproved',
        booking: bookingID,
        private: true,
        message: `Your request to stay with ${userDetails.name} has been approved`,
      };

      pubSub.emit(pubSub.events.booking.ACCEPTED_BY_HOST, {
        bookingId: bookingID,
        intern,
        host,
      });

      await registerNotification(hostNotification);
      await registerNotification(internNotification);

      // EMAIL TO GO HERE TO LET INTERN KNOW THEIR REQUEST HAS BEEN ACCEPTED

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

    pubSub.emit(pubSub.events.booking.ACCEPTED_BY_ADMIN, {
      bookingId: bookingID,
      intern,
      host,
    });

    await registerNotification(notification);

    // EMAIL TO GO HERE TO LET HOST KNOW THEY HAVE BOOKING REQUEST

    return res.json({ success: 'Booking request successfully updated' });
  } catch (err) {
    return next(boom.badImplementation(err));
  }
};

module.exports = adminReviewsBooking;
