const mongoose = require('mongoose');
const {
  hostRejectBookingsByIds,
  getBookingsDetails,
} = require('../../database/queries/bookings');
const { registerNotification } = require('../notifications');
const pubSub = require('./../../pubSub');

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

  await hostRejectBookingsByIds(bookingArr, hostId, rejectReason);

  // get bookings data
  const bookingDetails = await getBookingsDetails(bookingArr);

  bookingDetails.forEach(({ _id, intern, host }) => {
    pubSub.emit(pubSub.events.booking.REJECTED, {
      bookingId: _id,
      intern,
      host,
      rejectedBy: 'host',
    });
  });

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

  return bookingDetails;
};

module.exports = rejectBookings;
