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
  currentBalance:
    /* coupons */
    6000 +
    365000 +
    /* bookings */
    12000 +
    5000 +
    5000 +
    14000 +
    46000 +
    28000 -
    /* withraws */
    10000,
  income:
    /* coupons */
    6000 +
    365000 +
    /* bookings */
    12000 +
    5000 +
    5000 +
    14000 +
    46000 +
    28000,
  hostingIncome:
    0.45 * 12000 +
    0.45 * 5000 +
    0.45 * 5000 +
    0.45 * 14000 +
    0.45 * 46000 +
    0.45 * 28000,
  bursaryFunds:
    0.1 * 12000 +
    0.1 * 5000 +
    0.1 * 5000 +
    0.1 * 14000 +
    0.1 * 46000 +
    0.1 * 28000,
};

const internAccountData = {
  ...emptyAccount,
  income: 12000 + 5000 + 14000 + 28000,
};

const hostAccountData = {
  ...emptyAccount,
  income:
    0.45 * 12000 +
    0.45 * 5000 +
    0.45 * 5000 +
    0.45 * 14000 +
    0.45 * 46000 +
    0.45 * 28000,
  currentBalance:
    0.45 * 12000 +
    0.45 * 5000 +
    0.45 * 5000 +
    0.45 * 14000 +
    0.45 * 46000 +
    0.45 * 28000,
  withdrawal: 10000,
};

const organisationAccountData = {
  ...emptyAccount,
  income: 6000 + 365000,
  currentBalance: 0,
  couponsValue: 6000 + 365000,
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
