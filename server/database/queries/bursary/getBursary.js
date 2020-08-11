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
                  { $ne: ['$$applicationId', '$_id'] },
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

module.exports = {
  getBursaryWindows,
  getBursaryApplications,
};
