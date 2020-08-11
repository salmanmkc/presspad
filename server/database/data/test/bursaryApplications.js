const { BursaryApplication } = require('../../models');
const { bursaryApplicationStatuses: s } = require('../../constants');

const reset = () => BursaryApplication.deleteMany();

const createAll = async ({ users }) => {
  const { internUser, internUser2, internUser3, internUser4 } = users;

  const bursaryApplications = [
    {
      status: s.rejected,
      intern: internUser,
      typeOfUser: 'new',
      startDate: Date.now() - 100 * 24 * 60 * 60 * 1000,
      endDate: Date.now() - 80 * 24 * 60 * 60 * 1000,
    },
    {
      status: s.rejected,
      intern: internUser,
      typeOfUser: 'existing',
      startDate: Date.now() - 60 * 24 * 60 * 60 * 1000,
      endDate: Date.now() - 20 * 24 * 60 * 60 * 1000,
    },
    {
      status: s.request,
      intern: internUser,
      typeOfUser: 'existing',
      startDate: Date.now() - 14 * 24 * 60 * 60 * 1000,
      endDate: Date.now() + 100 * 24 * 60 * 60 * 1000,
    },
    {
      status: s.request,
      intern: internUser4,
      typeOfUser: 'new',
      startDate: Date.now() - 14 * 24 * 60 * 60 * 1000,
      endDate: Date.now() + 100 * 24 * 60 * 60 * 1000,
    },
    {
      status: s.preApproved,
      intern: internUser2,
      typeOfUser: 'new',
      startDate: Date.now() + 20 * 24 * 60 * 60 * 1000,
      endDate: Date.now() + 60 * 24 * 60 * 60 * 1000,
      bursaryPoints: 200,
    },
    {
      status: s.approved,
      intern: internUser3,
      typeOfUser: 'new',
      startDate: Date.now() + 20 * 24 * 60 * 60 * 1000,
      endDate: Date.now() + 30 * 24 * 60 * 60 * 1000,
      reservedAmount: 2000,
      usedAmount: 2000,
      bursaryPoints: 200,
    },
    {
      status: s.completed,
      intern: internUser,
      typeOfUser: 'existing',
      startDate: Date.now() + 20 * 24 * 60 * 60 * 1000,
      endDate: Date.now() + 30 * 24 * 60 * 60 * 1000,
      reservedAmount: 1000,
      usedAmount: 500,
      bursaryPoints: 200,
    },
  ];

  const [
    rejectedBursary,
    rejectedBursary2,
    requestedBursary,
    requestedBursary2,
    preApprovedBursary,
    approvedBursary,
    completedBursary,
  ] = await BursaryApplication.create(bursaryApplications);

  return {
    rejectedBursary,
    rejectedBursary2,
    requestedBursary,
    requestedBursary2,
    preApprovedBursary,
    approvedBursary,
    completedBursary,
  };
};

module.exports = {
  createAll,
  reset,
};
