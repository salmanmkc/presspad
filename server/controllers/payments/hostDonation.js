const boom = require('boom');

const {
  hostDonateToPresspad,
  getHostPendingPayments,
} = require('../../database/queries/payments');
const { getAccoutById } = require('../../database/queries/account');

const hostDonation = async (req, res, next) => {
  const { amount } = req.body;
  const { role, account, _id } = req.user;

  // check for user role
  if (role !== 'host' && role !== 'superhost') {
    return next(boom.unauthorized());
  }
  try {
    const pendingPayments = await getHostPendingPayments(_id);
    const { currentBalance } = await getAccoutById(account);

    if (amount > currentBalance - pendingPayments) {
      return next(boom.badData('Not enough balance'));
    }

    const results = await hostDonateToPresspad({
      amount,
      userId: _id,
      fromAccount: account,
    });
    return res.json(results);
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};

module.exports = hostDonation;
