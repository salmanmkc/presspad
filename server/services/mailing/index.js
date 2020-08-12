const scheduleReminderEmails = require('./scheduleReminderEmails');
const sendOutstandingReminders = require('./sendOutstandingReminders');
const markScheduledEmailsAsSent = require('./markScheduledEmailsAsSent');
const schedulePaymentReminders = require('./schedulePaymentReminders');
const sendOutstandingPaymentReminders = require('./sendOutstandingPaymentReminders');
const sendWelcomeEmail = require('./sendWelcomeEmail');
const sendRejectionEmails = require('./sendRejectionEmails');
const sendNewBookingEmails = require('./sendNewBookingEmails');
const sendAcceptedBookingEmails = require('./sendAcceptedBookingEmails');
const profileApproved = require('./profileApproved');
const profileCompleted = require('./profileCompleted');
const accountDeleted = require('./accountDeleted');
const resetPassword = require('./resetPassword');
const bookingCancelledByUser = require('./bookingCancelledByUser');
const bookingTerminated = require('./bookingTerminated');
const bookingCancelledUnpaid = require('./bookingCancelledUnpaid');
const bookingPaidOverDueWarning = require('./bookingPaidOverDueWarning');
const sendBursaryEmails = require('./sendBursaryEmails');

module.exports = {
  scheduleReminderEmails,
  sendOutstandingReminders,
  markScheduledEmailsAsSent,
  schedulePaymentReminders,
  sendOutstandingPaymentReminders,
  sendWelcomeEmail,
  sendRejectionEmails,
  sendNewBookingEmails,
  sendAcceptedBookingEmails,
  profileApproved,
  profileCompleted,
  accountDeleted,
  resetPassword,
  bookingCancelledByUser,
  bookingTerminated,
  bookingCancelledUnpaid,
  bookingPaidOverDueWarning,
  sendBursaryEmails,
};
