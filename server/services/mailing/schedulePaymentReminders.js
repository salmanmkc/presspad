const moment = require('moment');
const mongoose = require('mongoose');
const {
  createScheduledEmails,
} = require('../../database/queries/ScheduledEmail');

const schedulePaymentReminders = async ({
  startDate,
  endDate,
  bookingId,
  internId,
  installments,
  session,
}) => {
  const reminders = [];

  // checks
  if (moment(startDate).isSameOrAfter(moment(endDate))) {
    throw new Error('start date must be before end date');
  }

  installments.forEach(({ _id, dueDate, key }) => {
    if (!moment().isSameOrAfter(dueDate, 'd')) {
      reminders.push({
        type: 'PAYMENT_REMINDER',
        dueDate: moment(dueDate).subtract(2, 'd'),
        data: {
          installmentId: _id,
          bookingId: mongoose.Types.ObjectId(bookingId),
          internId: mongoose.Types.ObjectId(internId),
          paymentNumber: key + 1,
        },
      });
    }
  });

  await createScheduledEmails(reminders, session);
};

module.exports = schedulePaymentReminders;
