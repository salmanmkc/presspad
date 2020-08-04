const ScheduledEmail = require('../../models/ScheduledEmail');

// returns the payment reminder emails that their due date has been passed
const getOutstandingPaymentReminders = () =>
  ScheduledEmail.aggregate([
    {
      $match: {
        dueDate: { $lte: new Date() },
        type: {
          $in: ['PAYMENT_REMINDER'],
        },
        isSent: false,
      },
    },
    {
      $lookup: {
        from: 'bookings',
        localField: 'data.bookingId',
        foreignField: '_id',
        as: 'booking',
      },
    },
    { $unwind: '$booking' },
    {
      $lookup: {
        from: 'users',
        localField: 'data.internId',
        foreignField: '_id',
        as: 'intern',
      },
    },
    { $unwind: '$intern' },
    {
      $lookup: {
        from: 'users',
        localField: 'data.hostId',
        foreignField: '_id',
        as: 'host',
      },
    },
    { $unwind: '$host' },
    {
      $project: {
        'intern.password': 0,
        'host.password': 0,
      },
    },
  ]);

module.exports = getOutstandingPaymentReminders;
