const { WithdrawRequest } = require('../../models');

const getWithdrawRequestsByUserId = userId =>
  WithdrawRequest.find({
    user: userId,
    status: 'pending',
  });

module.exports = getWithdrawRequestsByUserId;
