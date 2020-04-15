const mongoose = require('mongoose');

const { Booking } = require('../../models');

const getBookingsDetails = bookingId => {
  // parse bookingIds
  let bookingArr;
  if (Array.isArray(bookingId)) {
    bookingArr = bookingId.map(id => mongoose.Types.ObjectId(id));
  } else {
    bookingArr = [mongoose.Types.ObjectId(bookingId)];
  }

  return Booking.find({ _id: { $in: bookingArr } })
    .populate('host', '-password') // populates with the host object, excluding the password
    .populate('intern', '-password'); // populates with the host object, excluding the password
};

module.exports = getBookingsDetails;
