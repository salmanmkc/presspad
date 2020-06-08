const newBookingRequest = require('./newBookingRequest');
const getUserBookings = require('./getUserBookings');
const viewBooking = require('./viewBooking');
const acceptBooking = require('./acceptBooking');
const rejectBooking = require('./rejectBooking');
const cancelBooking = require('./cancelBooking');
const getBookingsWithUsers = require('./getBookingsWithUsers');
const getActiveBookingsApi = require('./getActiveBookings');
const adminReviewsBooking = require('./adminReviewsBooking');
const getBookingHistoryApi = require('./getBookingHistory');

module.exports = {
  newBookingRequest,
  getUserBookings,
  viewBooking,
  acceptBooking,
  rejectBooking,
  cancelBooking,
  getBookingsWithUsers,
  getActiveBookingsApi,
  adminReviewsBooking,
  getBookingHistoryApi,
};
