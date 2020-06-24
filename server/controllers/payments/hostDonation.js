const boom = require('boom');

const {
  hostDonateToPresspad,
  getHostPendingPayments,
} = require('../../database/queries/payments');
const { getAccoutById } = require('../../database/queries/account');
const {
  getWithdrawRequestsByUserId,
} = require('../../database/queries/withdrawRequest');

const hostDonation = async (req, res, next) => {
  const { amount } = req.body;
  const { role, account, _id } = req.user;

  // check for user role
  if (role !== 'host' && role !== 'superhost') {
    return next(boom.unauthorized());
  }

  try {
    const { currentBalance } = await getAccoutById(account);
    const pendingPayments = await getHostPendingPayments(_id);
    const withdrawRequests = await getWithdrawRequestsByUserId(_id);
    const requestedAmount = withdrawRequests
      .filter(request => request && request.status === 'pending')
      .reduce((prev, cur) => {
        return prev + cur.amount;
      }, 0);

    if (amount > currentBalance - pendingPayments - requestedAmount) {
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
