const mongoose = require('mongoose');
const { ScheduledEmail } = require('../../models');

/**
 * remove unpaid paymentsReminders when using coupon after 1st payment
 * but the coupon cover all payments
 * This should work inside a transaction session
 * @param {array} installmentsIds
 * @param {object} session
 */
const removePaymentsReminders = async (installmentsIds, session) => {
  return ScheduledEmail.deleteMany(
    {
      $expr: { $in: ['$data.installmentId', installmentsIds] },
    },
    { session },
  );
};

/**
 * remove unpaid paymentsReminders when cancelling after payment
 * This should work inside a transaction session
 * @param {array} bookingId string or array of Ids
 * @param {object} session
 */
const removePaymentsRemindersForBookings = async (bookingId, session) => {
  let bookingIds;
  if (Array.isArray(bookingId)) {
    bookingIds = bookingId.map(id => mongoose.Types.ObjectId(id));
  } else {
    bookingIds = [mongoose.Types.ObjectId(bookingId)];
  }
  return ScheduledEmail.deleteMany(
    {
      $expr: {
        $and: [
          { $in: ['$data.bookingId', bookingIds] },
          { $eq: ['$isSent', false] },
          { $eq: ['$type', 'PAYMENT_REMINDER'] },
        ],
      },
    },
    { session },
  );
};

module.exports = {
  removePaymentsReminders,
  removePaymentsRemindersForBookings,
};
