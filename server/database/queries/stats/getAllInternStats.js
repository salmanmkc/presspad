const User = require('../../models/User');

module.exports.getAllInternStats = () =>
  User.aggregate([
    // get all interns
    {
      $match: { role: 'intern' },
    },
    // look up organisation for that intern
    {
      $lookup: {
        from: 'organisations',
        localField: 'organisation',
        foreignField: '_id',
        as: 'organisation',
      },
    },
    {
      $lookup: {
        from: 'bookings',
        let: { intern: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [{ $eq: ['$$intern', '$intern'] }],
              },
            },
          },
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
                        { $gte: ['$dueDate', new Date()] },
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
              as: 'nextInstallment',
            },
          },
        ],
        as: 'bookings',
      },
    },
    {
      $unwind: { path: '$bookings', preserveNullAndEmptyArrays: true },
    },

    {
      $unwind: {
        path: '$bookings.nextInstallment',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $addFields: {
        nextInstallment: '$bookings.nextInstallment',
      },
    },
    {
      $project: {
        'bookings.nextInstallment': 0,
      },
    },
    {
      $sort: { 'nextInstallment.dueDate': 1 },
    },
    // look up spent credits
    {
      $lookup: {
        from: 'accounts',
        localField: 'account',
        foreignField: '_id',
        as: 'account',
      },
    },
    {
      $lookup: {
        from: 'profiles',
        localField: '_id',
        foreignField: 'user',
        as: 'profile',
      },
    },
    {
      $group: {
        _id: {
          _id: '$_id',
          name: '$name',
          email: '$email',
          totalPayments: { $arrayElemAt: ['$account.income', 0] },
          // org name from org collection
          organisationName: { $arrayElemAt: ['$organisation.name', 0] },
          // org name from profile collections
          orgName: { $arrayElemAt: ['$profile.organisation', 0] },
          DBSCheck: { $arrayElemAt: ['$profile.DBSCheck', 0] },
          internshipStart: {
            $arrayElemAt: ['$profile.internshipStartDate', 0],
          },
          verified: {
            $arrayElemAt: ['$profile.verified', 0],
          },
          firstVerified: { $arrayElemAt: ['$profile.firstVerified', 0] },
          awaitingReview: {
            $arrayElemAt: ['$profile.awaitingReview', 0],
          },
          awaitingReviewDate: {
            $arrayElemAt: ['$profile.awaitingReviewDate', 0],
          },
          contactNumber: {
            $arrayElemAt: ['$profile.phoneNumber', 0],
          },
          profileId: {
            $arrayElemAt: ['$profile._id', 0],
          },
        },
        account: { $push: '$account' },
        bookings: { $push: '$bookings' },
        nextInstallment: { $first: '$nextInstallment' },
      },
    },
    {
      $project: {
        _id: '$_id._id',
        name: '$_id.name',
        organisation: '$_id.organisationName',
        bookings: '$bookings',
        nextInstallment: '$nextInstallment',
        totalPayments: '$_id.totalPayments',
        orgName: '$_id.orgName',
        DBSCheck: '$_id.DBSCheck',
        verified: '$_id.verified',
        awaitingReview: '$_id.awaitingReview',
        awaitingReviewDate: '$_id.awaitingReviewDate',
        firstVerified: '$_id.firstVerified',
        internshipStart: '$_id.internshipStart',
        contactNumber: '$_id.contactNumber',
        email: '$_id.email',
        profileId: '$_id.profileId',
      },
    },
    // only get interns that are approved or requesting approval
    {
      $match: {
        $or: [{ verified: true }, { awaitingReview: true }],
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        organisation: 1,
        orgName: 1,
        DBSCheck: 1,
        contactNumber: 1,
        email: 1,
        verified: 1,
        awaitingReview: 1,
        awaitingReviewDate: 1,
        firstVerified: 1,
        internshipStart: 1,
        profileId: 1,
        nextPaymentDueDate: '$nextInstallment.dueDate',
        nextPaymentPaid: {
          $cond: [
            { $ifNull: ['$nextInstallment.transaction', false] },
            true,
            false,
          ],
        },
        nextPayment: '$nextInstallment.amount',
        // get all the credits they've spent to date
        totalPayments: 1,
        // get any bookings that cover today's date
        liveBookings: {
          $size: {
            $filter: {
              input: '$bookings',
              as: 'booking',
              cond: {
                $and: [
                  { $lte: ['$$booking.startDate', new Date()] },
                  { $gte: ['$$booking.endDate', new Date()] },
                  {
                    $or: [
                      { $eq: ['$$booking.status', 'confirmed'] },
                      { $eq: ['$$booking.status', 'completed'] },
                    ],
                  },
                ],
              },
            },
          },
        },
        // get any pending bookings in the future
        pendingBookings: {
          $size: {
            $filter: {
              input: '$bookings',
              as: 'booking',
              cond: {
                $and: [
                  { $gt: ['$$booking.endDate', new Date()] },
                  { $eq: ['$$booking.status', 'pending'] },
                ],
              },
            },
          },
        },
        // get any confirmed bookings in the future
        confirmedBookings: {
          $size: {
            $filter: {
              input: '$bookings',
              as: 'booking',
              cond: {
                $and: [
                  { $gt: ['$$booking.startDate', new Date()] },
                  {
                    $or: [
                      { $eq: ['$$booking.status', 'confirmed'] },
                      { $eq: ['$$booking.status', 'completed'] },
                    ],
                  },
                ],
              },
            },
          },
        },
      },
    },
  ]);
