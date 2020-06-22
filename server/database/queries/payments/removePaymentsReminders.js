const { ScheduledEmail } = require('../../models');

/**
 * remove unpaid paymentsReminders when using coupon after 1st payment
 * but the coupon cover all payments
 * This should work inside a transaction session
 * @param {array} installmentsIds
 * @param {object} session
 */
const removePaymentsReminders = async (installmentsIds, session) => {
  return ScheduledEmail.deleteMany(
    {
      $expr: { $in: ['$data.installmentId', installmentsIds] },
    },
    { session },
  );
};

module.exports = removePaymentsReminders;
