const { Booking } = require('../../models');

const getOverlappingBookings = (bookingId, startDate, endDate) =>
  Booking.find({
    $expr: {
      $and: [
        { $ne: ['$_id', bookingId] },
        { $in: ['$status', ['pending', 'accepted', 'confirmed']] },
        { $lte: ['$startDate', new Date(endDate)] },
        { $gte: ['$endDate', new Date(startDate)] },
      ],
    },
  });

module.exports = getOverlappingBookings;
