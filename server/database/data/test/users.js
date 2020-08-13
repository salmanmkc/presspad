const User = require('../../models/User');
const organisation = require('./organisations');
const account = require('./accounts');

const reset = () => User.deleteMany();

const createNew = async ({ email, name, password, role }) => {
  const newUserData = {
    email: email || `${role}-test@test.com`,
    name: name || 'name',
    password: password || '123456',
    role,
  };

  const newAccount = await account.createNew();

  newUserData.account = newAccount._id;

  if (role === 'organisation') {
    const newOrganisation = await organisation.createNew();
    newUserData.organisation = newOrganisation._id;
    newUserData.account = newOrganisation.account;
  }

  return User.create(newUserData);
};

const createAll = async ({ accounts, organisations }) => {
  const { financialTimeOrganisation } = organisations;

  await reset();

  const {
    presspadAccount,
    internAccount,
    intern2Account,
    intern3Account,
    intern4Account,
    hostAccount,
    organisationAccount,
  } = accounts;

  const admin = {
    email: 'admin@test.com',
    name: 'Mark Upton',
    password: '123456',
    role: 'admin',
    account: presspadAccount._id,
  };

  const organisationUser = {
    email: 'organisation@test.com',
    name: 'Michael Peters',
    password: '123456',
    role: 'organisation',
    organisation: financialTimeOrganisation._id,
    account: organisationAccount._id,
  };

  const host = {
    email: 'host@test.com',
    name: 'Adam Appele',
    password: '123456',
    role: 'host',
    account: hostAccount._id,
    acceptAutomatically: true,
    respondingTime: 432000000, // 5 days in ms
    respondedRequests: 3,
    referralToken: 'faktokn1',
  };

  const intern = {
    email: 'intern@test.com',
    name: 'Mone Dupree',
    password: '123456',
    role: 'intern',
    organisation: financialTimeOrganisation._id,
    account: internAccount._id,
  };

  const intern2 = {
    email: 'intern2@test.com',
    name: 'intern2 Dupree',
    password: '123456',
    role: 'intern',
    organisation: financialTimeOrganisation._id,
    account: intern2Account._id,
  };

  const intern3 = {
    email: 'intern3@test.com',
    name: 'intern3 Dupree',
    password: '123456',
    role: 'intern',
    organisation: financialTimeOrganisation._id,
    account: intern3Account._id,
  };

  const intern4 = {
    email: 'intern4@test.com',
    name: 'intern4 Dupree',
    password: '123456',
    role: 'intern',
    organisation: financialTimeOrganisation._id,
    account: intern4Account._id,
  };

  const [
    adminUser,
    createdOrganisationUser,
    hostUser,
    internUser,
    internUser2,
    internUser3,
    internUser4,
  ] = await User.create([
    admin,
    organisationUser,
    host,
    intern,
    intern2,
    intern3,
    intern4,
  ]);

  // host who doesn't accept automatically
  const host2 = {
    email: 'host2@test.com',
    name: 'Bob Berry',
    password: '123456',
    role: 'host',
    account: hostAccount._id,
    acceptAutomatically: false,
    respondingTime: 432000000, // 5 days in ms
    respondedRequests: 3,
    referralToken: 'faktokn2',
    referredBy: hostUser._id,
  };

  const hostUser2 = await User.create(host2);

  return {
    adminUser,
    organisationUser: createdOrganisationUser,
    hostUser,
    hostUser2,
    internUser,
    internUser2,
    internUser3,
    internUser4,
  };
};

module.exports = {
  createAll,
  createNew,
  reset,
};
