const { Booking } = require('../../models');

const getOverlappingBookings = ({ bookingId, hostId, startDate, endDate }) =>
  Booking.find({
    $expr: {
      $and: [
        { $eq: ['host', hostId] },
        { $ne: ['$_id', bookingId] },
        { $in: ['$status', ['pending', 'accepted', 'confirmed']] },
        { $lte: ['$startDate', new Date(endDate)] },
        { $gte: ['$endDate', new Date(startDate)] },
      ],
    },
  }).populate('intern', '-password');

module.exports = getOverlappingBookings;
