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
        contactDetails: 1,
        sortedExternalTransactions: 1,
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
        as: 'accountDetails',
      },
    },
    {
      $lookup: {
        from: 'externaltransactions',
        localField: 'account',
        foreignField: 'account',
        as: 'transactions',
      },
    },
    {
      $project: {
        _id: 1,
        organisation: '$name',
        plan: 1,
        credits: 1,
        contactDetails: 1,
        account: 1,
        deposits: {
          $filter: {
            input: '$transactions',
            as: 'item',
            cond: { $eq: ['$$item.type', 'deposite'] },
          },
        },
        'internList._id': 1,
        'internList.name': 1,
        'internList.email': 1,
        interns: 1,
        couponsValue: { $arrayElemAt: ['$accountDetails.couponsValue', 0] },
        currentBalance: { $arrayElemAt: ['$accountDetails.currentBalance', 0] },
        totalPayments: { $arrayElemAt: ['$accountDetails.income', 0] },
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

      if (newClientObj.internList && newClientObj.internList.length > 0) {
        // map through all the interns and get their list of bookings and status
        const internBookings = await Promise.all(
          newClientObj.internList.map(async intern =>
            getInternStatus(intern._id),
          ),
        );
        // clean up the result so all bookings are in one array
        const cleanBookings = internBookings.reduce((a, b) => a.concat(b), []);

        // filter so only have bookings where they are at the host
        newClientObj.currentlyHosting = cleanBookings.filter(
          booking => booking.status === 'at host',
        ).length;
      }
      return newClientObj;
    }),
  );

  return completeClientStats;
};
