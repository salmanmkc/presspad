const {
  getOutstandingPaymentReminders,
} = require('../../database/queries/ScheduledEmail');
const sendPaymentReminderToIntern = require('../../helpers/mailHelper/sendPaymentReminderToIntern');
const { ordinalSuffixOf } = require('../../helpers/general');
const { registerNotification } = require('../notifications');

const sendOutstandingPaymentReminders = async () => {
  const emails = await getOutstandingPaymentReminders();

  if (!emails.length) {
    // nothing to send!
    return;
  }

  const promises = [];
  const sentEmailsIds = [];
  const notifications = [];

  emails.forEach(email => {
    const { data, intern, host, booking, _id } = email;

    promises.push(
      sendPaymentReminderToIntern({
        internName: intern.name,
        internEmail: intern.email,
        bookingId: booking._id,
        paymentNumber: ordinalSuffixOf(data.paymentNumber),
      }),
    );

    notifications.push(
      // notify Intern
      {
        user: intern._id,
        secondParty: host._id,
        type: 'paymentIsDue',
        booking: booking._id,
        private: true,
      },
      // notify Host
      {
        user: host._id,
        secondParty: intern._id,
        type: 'paymentIsDue',
        booking: booking._id,
        private: true,
      },
    );
    sentEmailsIds.push(_id);
  });

  if (notifications.length) {
    promises.push(registerNotification(notifications));
  }

  await Promise.all(promises);
  return sentEmailsIds;
};

module.exports = sendOutstandingPaymentReminders;
