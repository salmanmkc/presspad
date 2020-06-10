const Account = require('../../models/Account');

const emptyAccount = {
  income: 0,
  withdrawal: 0,
  donation: 0,
  currentBalance: 0,
  couponsValue: 0,
};

const presspadAccountData = {
  ...emptyAccount,
  currentBalance: 6000 + 365000 + 5000 + 14000 - 10000,
  income: 6000 + 365000 + 5000 + 14000,
};

const internAccountData = { ...emptyAccount, income: 5000 + 14000 };

const hostAccountData = {
  ...emptyAccount,
  income: 5000 + 5000 + 14000 + 46000,
  currentBalance: 14000 + 46000, // first bookings moneyGoTo presspad
};

const organisationAccountData = {
  ...emptyAccount,
  income: 6000 + 365000,
  currentBalance: 6000 + 365000,
};

const allAccounts = [
  presspadAccountData,
  internAccountData,
  hostAccountData,
  organisationAccountData,
];

const createNew = () => Account.create(emptyAccount);
const reset = () => Account.deleteMany();

const createAll = async () => {
  await reset();
  const [
    presspadAccount,
    internAccount,
    hostAccount,
    organisationAccount,
  ] = await Account.create(allAccounts);

  return { presspadAccount, internAccount, hostAccount, organisationAccount };
};

module.exports = {
  createAll,
  createNew,
  reset,
};
