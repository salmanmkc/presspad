const scheduleReminderEmails = require('./scheduleReminderEmails');
const sendOutstandingReminders = require('./sendOutstandingReminders');
const markScheduledEmailsAsSent = require('./markScheduledEmailsAsSent');
const schedulePaymentReminders = require('./schedulePaymentReminders');
const sendOutstandingPaymentReminders = require('./sendOutstandingPaymentReminders');
const sendWelcomeEmail = require('./sendWelcomeEmail');
const sendRejectionEmails = require('./sendRejectionEmails');

module.exports = {
  scheduleReminderEmails,
  sendOutstandingReminders,
  markScheduledEmailsAsSent,
  schedulePaymentReminders,
  sendOutstandingPaymentReminders,
  sendWelcomeEmail,
  sendRejectionEmails,
};
