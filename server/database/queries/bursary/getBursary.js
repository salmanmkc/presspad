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
  return BursaryApplication.aggregate([
    {
      $match: { $expr: { $eq: ['$status', type] } },
    },
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
              reservedAmount: { $sum: '$reservedAmount' },
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
            { $arrayElemAt: ['$awardedBursariesCost.reservedAmount', 0] },
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
        dateRequested: '$createdAt',
      },
    },
  ]);
};

module.exports = {
  getBursaryWindows,
  getBursaryApplications,
};
