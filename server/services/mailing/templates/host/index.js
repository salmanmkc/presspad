const bookingCancelled = require('./bookingCancelled');
const bookingCancelledByHost = require('./bookingCancelledByHost');
const bookingCancelledByIntern = require('./bookingCancelledByIntern');
const bookingRequest = require('./bookingRequest');
const bookingTerminated = require('./bookingTerminated');
const bookingUpdateWaitingForPayment = require('./bookingUpdateWaitingForPayment');
const incompleteProfileAfter3Weeks = require('./incompleteProfileAfter3Weeks');
const OneWeekToGo = require('./OneWeekToGo');
const paymentOverdue = require('./paymentOverdue');
const profileApproved = require('./profileApproved');
const videoPropertyCheck = require('./videoPropertyCheck');
const welcome = require('./welcome');

module.exports = {
  bookingCancelled,
  bookingCancelledByHost,
  bookingCancelledByIntern,
  bookingRequest,
  bookingTerminated,
  bookingUpdateWaitingForPayment,
  incompleteProfileAfter3Weeks,
  OneWeekToGo,
  paymentOverdue,
  profileApproved,
  videoPropertyCheck,
  welcome,
};
