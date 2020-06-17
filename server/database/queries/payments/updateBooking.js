const mongoose = require('mongoose');

const Booking = require('../../models/Booking');

/**
 * Update payedAmount and status in the booking collection
 * This should work inside a transaction session
 * @param {object} obj
 * @param {string} obj.bookingId
 * @param {number} obj.amount amount that used in the transaction
 * @param {string} obj.status
 * @param {session} obj.session
 */
const updateBooking = ({ bookingId, amount, status, couponId, session }) => {
  const updateQuery = { $inc: { payedAmount: amount } };
  if (status) {
    updateQuery.status = status;
  }
  if (couponId) {
    updateQuery.coupon = couponId;
  }
  // if paying first time
  if (status && !couponId) {
    updateQuery['$unset'] = { coupon: 1 };
  }

  return Booking.updateOne(
    { _id: mongoose.Types.ObjectId(bookingId) },
    updateQuery,
    { session },
  );
};

module.exports = updateBooking;
