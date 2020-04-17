const mongoose = require('mongoose');
const {
  hostRejectBookingsByIds,
  getBookingsDetails,
} = require('../../database/queries/bookings');
const { registerNotification } = require('../notifications');

const requestRejectedToIntern = require('../../helpers/mailHelper/requestRejectedToIntern');

/**
 * Update bookings status as rejected and add rejectReason
 * accept one or more bookingIds
 * @param bookingId {String} Array of bookingIds or one bookingId String
 * @param hostId {String}
 * @param rejectReason {String}
 */
const rejectBookings = async (bookingIds, hostId, rejectReason) => {
  // parse bookingIds
  let bookingArr;
  if (Array.isArray(bookingIds)) {
    bookingArr = bookingIds.map(id => mongoose.Types.ObjectId(id));
  } else {
    bookingArr = [mongoose.Types.ObjectId(bookingIds)];
  }

  const rejectedBookings = await hostRejectBookingsByIds(
    bookingArr,
    hostId,
    rejectReason,
  );

  // get bookings data
  const bookingDetails = await getBookingsDetails(bookingArr);

  // create a notifications for intern
  const notifications = bookingDetails.map(({ _id, intern, host }) => ({
    private: false,
    user: intern._id,
    secondParty: host._id,
    type: 'stayRejected',
    booking: _id,
  }));

  const promiseArray = [registerNotification(notifications)];

  if (process.env.NODE_ENV === 'production') {
    bookingDetails.forEach(_booking => {
      promiseArray.push(requestRejectedToIntern(_booking));
    });
  }

  await Promise.all(promiseArray);

  return rejectedBookings;
};

module.exports = rejectBookings;
