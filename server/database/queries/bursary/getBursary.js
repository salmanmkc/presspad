const mongoose = require('mongoose');

const { BursaryWindow, BursaryApplication } = require('../../models');
const {
  bursaryWindowStatuses,
  bursaryApplicationStatuses,
} = require('../../constants');

const getBursaryWindows = () => {
  return BursaryWindow.find({
    status: bursaryWindowStatuses.active,
  });
};

const getBursaryApplications = type => {
  let matchObject = {};
  if (type === 'history') {
    matchObject = {
      $match: {
        $expr: {
          $or: [
            { $eq: ['$status', bursaryApplicationStatuses.rejected] },
            { $eq: ['$status', bursaryApplicationStatuses.completed] },
          ],
        },
      },
    };
  } else {
    matchObject = {
      $match: { $expr: { $eq: ['$status', type] } },
    };
  }

  return BursaryApplication.aggregate([
    matchObject,
    {
      $lookup: {
        from: 'bursaryapplications',
        let: { internId: '$intern' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [{ $eq: ['$$internId', '$intern'] }],
              },
            },
          },
          {
            $group: {
              _id: null,
              totalPotentialAmount: { $sum: '$totalPotentialAmount' },
            },
          },
        ],
        as: 'awardedBursariesCost',
      },
    },
    {
      $addFields: {
        awardedBursariesCost: {
          $ifNull: [
            { $arrayElemAt: ['$awardedBursariesCost.totalPotentialAmount', 0] },
            0,
          ],
        },
      },
    },
    {
      $lookup: {
        from: 'bursaryapplications',
        let: { internId: '$intern', applicationId: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$$internId', '$intern'] },
                  // { $ne: ['$$applicationId', '$_id'] },
                  { $eq: ['$status', bursaryApplicationStatuses.rejected] },
                ],
              },
            },
          },
          {
            $count: 'count',
          },
        ],
        as: 'rejectedBursaries',
      },
    },
    {
      $addFields: {
        rejectedBursaries: {
          $ifNull: [{ $arrayElemAt: ['$rejectedBursaries.count', 0] }, 0],
        },
      },
    },
    {
      $lookup: {
        from: 'users',
        let: { intern: '$intern' },
        pipeline: [
          { $match: { $expr: { $eq: ['$$intern', '$_id'] } } },
          {
            $project: {
              name: 1,
              email: 1,
            },
          },
        ],
        as: 'intern',
      },
    },
    {
      $unwind: { path: '$intern', preserveNullAndEmptyArrays: true },
    },
    {
      $addFields: {
        id: '$intern._id',
        name: '$intern.name',
        applicationStatus: '$status',
        totalAmountSpent: '$totalSpentSoFar',
        dateRequested: '$createdAt',
      },
    },
  ]);
};

const getBursaryApplicationInfo = id => {
  return BursaryApplication.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(id) } },
    // lookup admin account
    {
      $lookup: {
        from: 'users',
        pipeline: [
          { $match: { role: 'admin' } },
          {
            $lookup: {
              from: 'accounts',
              localField: 'account',
              foreignField: '_id',
              as: 'account',
            },
          },
          {
            $unwind: { path: '$account', preserveNullAndEmptyArrays: true },
          },
        ],
        as: 'admin',
      },
    },
    // lookup intern profile to get internship details
    {
      $lookup: {
        from: 'profiles',
        let: { intern: '$intern' },
        pipeline: [{ $match: { $expr: { $eq: ['$$intern', '$user'] } } }],
        as: 'intern',
      },
    },
    {
      $unwind: { path: '$intern', preserveNullAndEmptyArrays: true },
    },
    {
      $project: {
        status: 1,
        bursaryFunds: { $arrayElemAt: ['$admin.account.bursaryFunds', 0] },
        internshipStartDate: '$intern.internshipStartDate',
        internshipEndDate: '$intern.internshipEndDate',
      },
    },
  ]);
};

module.exports = {
  getBursaryWindows,
  getBursaryApplications,
  getBursaryApplicationInfo,
};
