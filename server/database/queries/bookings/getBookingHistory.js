// this gets all bookings that are no longer active
// (i.e. cancelled, pending, accepted, confirmed, live)
const Booking = require('../../models/Booking');
const { bookingStatuses } = require('../../../constants');

module.exports = () =>
  Booking.aggregate([
    {
      $match: {
        $or: [
          {
            status: bookingStatuses.cancelled,
          },
          {
            status: bookingStatuses.cancelledAfterPayment,
          },
          {
            status: bookingStatuses.awaitingCancellation,
          },
          {
            status: bookingStatuses.completed,
          },
          {
            status: bookingStatuses.rejectedByAdmin,
          },
          {
            status: bookingStatuses.rejected,
          },
        ],
      },
    },
    {
      $lookup: {
        from: 'users',
        let: {
          userID: '$intern',
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ['$$userID', '$_id'],
              },
            },
          },
          {
            $lookup: {
              from: 'profiles',
              localField: '_id',
              foreignField: 'user',
              as: 'details',
            },
          },
          {
            $unwind: {
              path: '$details',
              preserveNullAndEmptyArrays: false,
            },
          },
          {
            $project: {
              email: 1.0,
              name: 1.0,
              phone: '$details.phoneNumber',
              internship: {
                'Start Date': '$details.internshipStartDate',
                'End Date': '$details.internshipEndDate',
                Organisation: '$details.organisation',
                'Contact Details': '$details.internshipContact',
                'Proof of Internship': '$details.offerLetter',
              },
            },
          },
        ],
        as: 'intern',
      },
    },
    {
      $lookup: {
        from: 'users',
        let: {
          userID: '$host',
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ['$$userID', '$_id'],
              },
            },
          },
          {
            $lookup: {
              from: 'profiles',
              localField: '_id',
              foreignField: 'user',
              as: 'details',
            },
          },
          {
            $unwind: {
              path: '$details',
              preserveNullAndEmptyArrays: false,
            },
          },
          {
            $project: {
              email: 1.0,
              name: 1.0,
              phone: '$details.phoneNumber',
            },
          },
        ],
        as: 'host',
      },
    },
    {
      $unwind: {
        path: '$intern',
        preserveNullAndEmptyArrays: false,
      },
    },
    {
      $unwind: {
        path: '$host',
        preserveNullAndEmptyArrays: false,
      },
    },
    {
      $lookup: {
        from: 'coupons',
        let: {
          couponID: '$coupon',
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ['$$couponID', '$_id'],
              },
            },
          },
          {
            $lookup: {
              from: 'organisations',
              localField: 'organisation',
              foreignField: '_id',
              as: 'organisation',
            },
          },
          {
            $unwind: {
              path: '$organisation',
              preserveNullAndEmptyArrays: false,
            },
          },
          {
            $project: {
              discountRate: 1.0,
              Organisation: '$organisation.name',
            },
          },
        ],
        as: 'coupon',
      },
    },
    {
      $unwind: {
        path: '$coupon',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      // $sort: { startDate: 1 },
      $sort: { updatedAt: -1 },
    },
  ]);
