const { BursaryApplication } = require('../../models');
const { bursaryApplicationStatuses: s } = require('../../constants');

const reset = () => BursaryApplication.deleteMany();

const createAll = async ({ users, bursaryWindows: { bursaryWindow1 } }) => {
  const { internUser, internUser2, internUser3, internUser4 } = users;

  const bursaryApplications = [
    {
      status: s.rejected,
      intern: internUser,
      typeOfUser: 'new',
      startDate: Date.now() - 100 * 24 * 60 * 60 * 1000,
      endDate: Date.now() - 80 * 24 * 60 * 60 * 1000,
      bursaryWindow: bursaryWindow1._id,
    },
    {
      status: s.rejected,
      intern: internUser,
      typeOfUser: 'existing',
      startDate: Date.now() - 60 * 24 * 60 * 60 * 1000,
      endDate: Date.now() - 20 * 24 * 60 * 60 * 1000,
      bursaryWindow: bursaryWindow1._id,
    },
    {
      status: s.request,
      intern: internUser,
      typeOfUser: 'existing',
      startDate: Date.now() - 14 * 24 * 60 * 60 * 1000,
      endDate: Date.now() + 100 * 24 * 60 * 60 * 1000,
      bursaryWindow: bursaryWindow1._id,
    },
    {
      status: s.request,
      intern: internUser4,
      typeOfUser: 'new',
      startDate: Date.now() - 14 * 24 * 60 * 60 * 1000,
      endDate: Date.now() + 100 * 24 * 60 * 60 * 1000,
      bursaryWindow: bursaryWindow1._id,
    },
    {
      status: s.preApproved,
      intern: internUser2,
      typeOfUser: 'new',
      startDate: Date.now() + 20 * 24 * 60 * 60 * 1000,
      endDate: Date.now() + 60 * 24 * 60 * 60 * 1000,
      bursaryPoints: 200,
      bursaryWindow: bursaryWindow1._id,
    },
    {
      status: s.preApproved,
      intern: internUser3,
      typeOfUser: 'existing',
      startDate: Date.now() + 40 * 24 * 60 * 60 * 1000,
      endDate: Date.now() + 60 * 24 * 60 * 60 * 1000,
      bursaryWindow: bursaryWindow1._id,
    },
    {
      status: s.approved,
      intern: internUser3,
      typeOfUser: 'new',
      startDate: Date.now() + 20 * 24 * 60 * 60 * 1000,
      endDate: Date.now() + 30 * 24 * 60 * 60 * 1000,
      totalPotentialAmount: 2000 * 100,
      totalSpentSoFar: 1500 * 100,
      bursaryPoints: 200,
      bursaryWindow: bursaryWindow1._id,
    },
    {
      status: s.completed,
      intern: internUser,
      typeOfUser: 'existing',
      startDate: Date.now() + 20 * 24 * 60 * 60 * 1000,
      endDate: Date.now() + 30 * 24 * 60 * 60 * 1000,
      totalPotentialAmount: 1000 * 100,
      totalSpentSoFar: 500 * 100,
      bursaryPoints: 200,
      bursaryWindow: bursaryWindow1._id,
    },
    {
      status: s.approved,
      intern: internUser,
      typeOfUser: 'existing',
      startDate: Date.now() + 20 * 24 * 60 * 60 * 1000,
      endDate: Date.now() + 365 * 24 * 60 * 60 * 1000,
      totalPotentialAmount: 2000 * 100,
      totalSpentSoFar: 0,
      londonWeighting: true,
      bursaryPoints: 200,
      discountRate: 20,
      bursaryWindow: bursaryWindow1._id,
    },
  ];

  const [
    rejectedBursary,
    rejectedBursary2,
    requestedBursary,
    requestedBursary2,
    preApprovedBursary,
    preApprovedBursary2,
    approvedBursary,
    completedBursary,
    approvedInternUserBursary,
  ] = await BursaryApplication.create(bursaryApplications);

  return {
    rejectedBursary,
    rejectedBursary2,
    requestedBursary,
    requestedBursary2,
    preApprovedBursary,
    preApprovedBursary2,
    approvedBursary,
    completedBursary,
    approvedInternUserBursary,
  };
};

module.exports = {
  createAll,
  reset,
};
