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
            status: bookingStatuses.awaitingCancellation,
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
        from: 'bursaryapplications',
        let: { applicationId: '$approvedBursary', bookingId: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ['$$applicationId', '$_id'] },
            },
          },
          {
            $project: {
              transactions: {
                $filter: {
                  input: '$transactions',
                  as: 'item',
                  cond: { $eq: ['$$item.booking', '$$bookingId'] },
                },
              },
            },
          },
          {
            $unwind: {
              path: '$transactions',
              preserveNullAndEmptyArrays: false,
            },
          },
        ],
        as: 'bursaryApplication',
      },
    },
    {
      $addFields: {
        bursaryApplication: {
          $arrayElemAt: ['$bursaryApplication.transactions', 0],
        },
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
        as: 'internDetails',
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
        as: 'hostDetails',
      },
    },
    {
      $unwind: {
        path: '$internDetails',
        preserveNullAndEmptyArrays: false,
      },
    },
    {
      $unwind: {
        path: '$hostDetails',
        preserveNullAndEmptyArrays: false,
      },
    },
    {
      $lookup: {
        from: 'coupons',
        let: {
          couponID: '$coupon',
          bookingId: '$_id',
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
              let: { orgId: '$organisation' },
              pipeline: [{ $match: { $expr: { $eq: ['$_id', '$$orgId'] } } }],
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
              transactions: {
                $filter: {
                  input: '$transactions',
                  as: 'transactions',
                  cond: { $eq: ['$$transactions.booking', '$$bookingId'] },
                },
              },
            },
          },
          {
            $addFields: {
              discountAmount: { $arrayElemAt: ['$transactions.amount', 0] },
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
      $addFields: {
        host: '$hostDetails.name',
        intern: '$internDetails.name',
        paidByOrganisation: '$coupon.discountRate',
        organisation: '$coupon.Organisation',
      },
    },
    {
      // $sort: { startDate: 1 },
      $sort: { updatedAt: -1 },
    },
  ]);
