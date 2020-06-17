const mongoose = require('mongoose');

const { Installment } = require('../../models');

/**
 * Update unpaid installments when using coupon after 1st payment
 * This should work inside a transaction session
 * @param {array} updatedInstallments
 * @param {object} session
 */
const updateUnpaidInstallments = async (updatedInstallments, session) => {
  const promiseArray = [];
  updatedInstallments.forEach(installment => {
    if (!installment.transaction) {
      promiseArray.push(
        Installment.updateOne(
          { _id: mongoose.Types.ObjectId(installment._id) },
          { amount: installment.amount },
          { session },
        ),
      );
    }
  });

  return Promise.all(promiseArray);
};

module.exports = updateUnpaidInstallments;
