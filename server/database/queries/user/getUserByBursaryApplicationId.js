const mongoose = require('mongoose');
const { BursaryApplication } = require('../../models');

module.exports = id => {
  return BursaryApplication.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(id) } },

    {
      $lookup: {
        from: 'users',
        let: { intern: '$intern' },
        pipeline: [
          { $match: { $expr: { $eq: ['$$intern', '$_id'] } } },
          { $project: { email: 1, name: 1 } },
        ],
        as: 'intern',
      },
    },
    {
      $unwind: { path: '$intern', preserveNullAndEmptyArrays: true },
    },
    {
      $project: {
        intern: 1,
      },
    },
  ]);
};
