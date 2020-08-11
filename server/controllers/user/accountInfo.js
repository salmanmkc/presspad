const boom = require('boom');

const { getAccountByUserId } = require('../../database/queries/account');

module.exports = async (req, res, next) => {
  const { user } = req;

  if (user) {
    const [account] = await getAccountByUserId(user._id);

    if (!account) return next(boom.notFound());

    const {
      income,
      withdrawal,
      donation,
      couponsValue,
      currentBalance,
      hostingIncome,
      bursaryFunds,
    } = account;

    return res.json({
      income,
      withdrawal,
      donation,
      couponsValue,
      currentBalance,
      hostingIncome,
      bursaryFunds,
    });
  }

  return next(boom.unauthorized());
};
