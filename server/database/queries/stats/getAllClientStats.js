const Organisation = require('../../models/Organisation');

const { getInternStatus } = require('../user/index');

module.exports.getAllClientStats = async () => {
  const clientStats = await Organisation.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: 'organisation',
        as: 'users',
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        plan: 1,
        account: 1,
        interns: {
          $filter: {
            input: '$users',
            as: 'user',
            cond: { $eq: ['$$user.role', 'intern'] },
          },
        },
      },
    },
    {
      $addFields: {
        interns: { $size: '$interns' },
        internList: '$interns',
      },
    },
    {
      $lookup: {
        from: 'accounts',
        localField: 'account',
        foreignField: '_id',
        as: 'account',
      },
    },
    {
      $project: {
        _id: 1,
        organisation: '$name',
        plan: 1,
        credits: 1,
        'internList._id': 1,
        'internList.name': 1,
        'internList.email': 1,
        interns: 1,
        couponsValue: { $arrayElemAt: ['$account.couponsValue', 0] },
        currentBalance: { $arrayElemAt: ['$account.currentBalance', 0] },
        totalPayments: { $arrayElemAt: ['$account.income', 0] },
      },
    },
  ]);

  // additional function to get number of interns currently being hosted
  const completeClientStats = await Promise.all(
    // map through each of the clients
    clientStats.map(async client => {
      // set up a new object for this client
      const newClientObj = client;

      // create a new key for currentlyHosting and default to 0
      newClientObj.currentlyHosting = 0;

      if (newClientObj.interns && newClientObj.interns.length > 0) {
        // map through all the interns and get their list of bookings and status
        const internBookings = await Promise.all(
          newClientObj.interns.map(async intern => getInternStatus(intern._id)),
        );
        // clean up the result so all bookings are in one array
        const cleanBookings = internBookings.reduce((a, b) => a.concat(b), []);
        // filter so only have bookings where they are at the host
        newClientObj.currentlyHosting = cleanBookings.filter(
          booking => booking.status === 'At host',
        ).length;
      }
      return newClientObj;
    }),
  );

  return completeClientStats;
};
