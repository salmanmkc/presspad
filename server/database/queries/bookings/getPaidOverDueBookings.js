const moment = require('moment');
const Booking = require('../../models/Booking');
const { bookingStatuses } = require('../../../constants');

const getPaidOverDueBookings = type => {
  let filterByDueDate;
  if (type === 'warning') {
    filterByDueDate = [
      {
        $gte: [
          '$installment.dueDate',
          new Date(
            moment
              .utc()
              .subtract(7, 'days')
              .startOf('day')
              .toISOString(),
          ),
        ],
      },
      {
        $lt: [
          '$installment.dueDate',
          new Date(
            moment
              .utc()
              .subtract(6, 'days')
              .startOf('day')
              .toISOString(),
          ),
        ],
      },
    ];
  } else if (type === 'terminate') {
    filterByDueDate = [
      {
        $lt: [
          '$installment.dueDate',
          new Date(
            moment
              .utc()
              .subtract(9, 'days')
              .startOf('day')
              .toISOString(),
          ),
        ],
      },
    ];
  } else {
    throw new Error('invalid type, choose either "warning" or "terminate"');
  }
  return Booking.aggregate([
    {
      $lookup: {
        from: 'installments',
        let: { bookingId: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$booking', '$$bookingId'] },
                  { $lte: ['$transaction', null] },
                ],
              },
            },
          },
          {
            $sort: {
              dueDate: 1,
            },
          },
        ],
        as: 'installment',
      },
    },
    {
      $addFields: {
        installment: { $arrayElemAt: ['$installment', 0] },
      },
    },
    {
      $match: {
        $expr: {
          $and: [
            {
              $eq: ['$status', bookingStatuses.confirmed],
            },
            ...filterByDueDate,
            {
              $gt: ['$installment', null],
            },
          ],
        },
      },
    },
  ]);
};

module.exports = getPaidOverDueBookings;
