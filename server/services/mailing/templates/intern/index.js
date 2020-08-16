const bookingCancelledByInternBeforePayment = require('./bookingCancelledByInternBeforePayment');
const bookingCancelledByHostBeforePayment = require('./bookingCancelledByHostBeforePayment');
const bookingCancelledByUserAfterPayment = require('./bookingCancelledByUserAfterPayment');
const bookingApprovedPaymentNeeded = require('./bookingApprovedPaymentNeeded');
const bookingCancelledByHost = require('./bookingCancelledByHost');
const bookingRejected = require('./bookingRejected');
const bookingRequestReceived = require('./bookingRequestReceived');
const bookingterminated = require('./bookingterminated');
const hostCancellationAfterPayment = require('./hostCancellationAfterPayment');
const incompleteProfileAfter3Weeks = require('./incompleteProfileAfter3Weeks');
const oneWeekToGo = require('./oneWeekToGo');
const paymentOverdue = require('./paymentOverdue');
const profileApproved = require('./profileApproved');
const profileRejected = require('./profileRejected');
const welcome = require('./welcome');
const bursary = require('./bursary');

module.exports = {
  bookingCancelledByHostBeforePayment,
  bookingCancelledByInternBeforePayment,
  bookingCancelledByUserAfterPayment,
  bookingApprovedPaymentNeeded,
  bookingCancelledByHost,
  bookingRejected,
  bookingRequestReceived,
  bookingterminated,
  hostCancellationAfterPayment,
  incompleteProfileAfter3Weeks,
  oneWeekToGo,
  paymentOverdue,
  profileApproved,
  profileRejected,
  welcome,
  bursary,
};
