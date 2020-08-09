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

const getBursaryApplications = () => {
  return BursaryApplication.aggregate([
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
                ],
              },
            },
          },
          {
            $group: {
              _id: null,
              usedAmount: { $sum: '$usedAmount' },
            },
          },
        ],
        as: 'sumOtherBursariesUsedAmount',
      },
    },
    {
      $addFields: {
        sumOtherBursariesUsedAmount: {
          $ifNull: [
            { $arrayElemAt: ['$sumOtherBursariesUsedAmount.usedAmount', 0] },
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
        as: 'rejected',
      },
    },
    {
      $addFields: {
        rejected: { $ifNull: [{ $arrayElemAt: ['$rejected.count', 0] }, 0] },
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
      $group: {
        _id: '$status',
        data: { $push: '$$ROOT' },
      },
    },
  ]);
};

module.exports = {
  getBursaryWindows,
  getBursaryApplications,
};
