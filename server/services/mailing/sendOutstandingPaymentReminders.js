const {
  getOutstandingPaymentReminders,
} = require('../../database/queries/ScheduledEmail');
const sendPaymentReminderToIntern = require('../../helpers/mailHelper/sendPaymentReminderToIntern');
const { ordinalSuffixOf } = require('../../helpers/general');

const sendOutstandingPaymentReminders = async () => {
  const emails = await getOutstandingPaymentReminders();
  if (!emails.length) {
    // nothing to send!
    return;
  }

  const promises = [];
  const sentEmailsIds = [];

  emails.forEach(email => {
    const { data, intern, booking, _id } = email;

    promises.push(
      sendPaymentReminderToIntern({
        internName: intern.name,
        internEmail: intern.email,
        bookingId: booking._id,
        paymentNumber: ordinalSuffixOf(data.paymentNumber),
      }),
    );

    sentEmailsIds.push(_id);
  });

  await Promise.all(promises);
  return sentEmailsIds;
};

module.exports = sendOutstandingPaymentReminders;
