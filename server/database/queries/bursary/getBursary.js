const { BursaryWindow, BursaryApplication } = require('../../models');
const { bursaryWindowStatuses } = require('../../constants');

const getBursaryWindows = () => {
  return BursaryWindow.find({
    status: bursaryWindowStatuses.active,
  });
};

// const getBursaryApplications = () => {
//   return BursaryApplication.aggregate([
//     {
//       $lookup: {
//         from: 'users',
//         let: { intern: '$intern' },
//         pipeline: [
//           { $match: { $expr: { $eq: ['$$intern', '$_id'] } } },
//           {
//             $project: {
//               name: 1,
//             },
//           },
//         ],
//         as: 'intern',
//       },
//     },
//   ]);
// };

module.exports = {
  getBursaryWindows,
  // getBursaryApplications,
};
