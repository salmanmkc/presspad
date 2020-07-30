const moment = require('moment');
const Booking = require('../../models/Booking');
const { bookingStatuses } = require('../../../constants');

const getUnpaidOverDueBookings = () => {
  return Booking.aggregate([
    {
      $match: {
        status: {
          $in: [bookingStatuses.accepted],
        },
        confirmOrRejectDate: {
          $lt: new Date(
            moment
              .utc()
              .subtract(2, 'days')
              .toISOString(),
          ),
        },
      },
    },
  ]);
};

module.exports = getUnpaidOverDueBookings;
