const orgPayment = require('./organisation');
const getPaymentsInfo = require('./getPaymentsInfo');
const internPayment = require('./intern');
const {
  withdrawRequest,
  confirmOrCancelWithdrawRequest,
} = require('./withdrawRequest');

module.exports = {
  internPayment,
  orgPayment,
  withdrawRequest,
  confirmOrCancelWithdrawRequest,
  getPaymentsInfo,
};
