const orgPayment = require('./organisation');
const getPaymentsInfo = require('./getPaymentsInfo');
const internPayment = require('./intern');
const {
  withdrawRequest,
  confirmOrCancelWithdrawRequest,
} = require('./withdrawRequest');
const cancelBookingAfterPayment = require('./cancelBookingAfterPayment');

module.exports = {
  internPayment,
  orgPayment,
  withdrawRequest,
  confirmOrCancelWithdrawRequest,
  getPaymentsInfo,
  cancelBookingAfterPayment,
};
