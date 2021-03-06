const mongoose = require('mongoose');
const Installment = require('../../models/Installment');

/**
 * Insert installments (BE AWARE this modify the installments[Array | Object] reference)
 * at this point no one use the installment reference
 * This should work inside a transaction session
 * @param {Array | Object} installments Array for 3 installmetns | object for upFront
 * @param {string} bookingId
 * @param {string} internId
 * @param {string} hostId
 * @param {session} session Transaction session
 */
const createInstallments = (
  installments,
  bookingId,
  internId,
  hostId,
  session,
) => {
  if (Array.isArray(installments)) {
    // modify the installments
    for (let i = 0; i < installments.length; i += 1) {
      // eslint-disable-next-line no-param-reassign
      installments[i].intern = internId;
      // eslint-disable-next-line no-param-reassign
      installments[i].host = hostId;
      // eslint-disable-next-line no-param-reassign
      installments[i].booking = bookingId;
    }
    return Installment.insertMany(installments, { session });
  }
  // eslint-disable-next-line no-param-reassign
  installments.intern = internId;
  // eslint-disable-next-line no-param-reassign
  installments.host = hostId;
  // eslint-disable-next-line no-param-reassign
  installments.booking = bookingId;

  // used insertMany so we get same response from DB
  return Installment.insertMany([installments], { session });
};

/**
 * Update paid installment by adding transaction Id, This should work inside a transaction session
 * @param {string} installmentId
 * @param {string} transactionId
 * @param {session} session
 */
const updatePaidInstallment = (installmentId, transactionId, session) =>
  Installment.updateOne(
    { _id: installmentId },
    { transaction: transactionId },
    { session },
  );

/**
 * Remove unpaid installment for a booking when it cancelled after payment, This should work inside a transaction session
 * @param {string} bookingId string or Array of Ids
 * @param {session} session
 */
const removeUnpaidInstallmentsForBookings = (bookingId, session) => {
  let bookingIds;
  if (Array.isArray(bookingId)) {
    bookingIds = bookingId.map(id => mongoose.Types.ObjectId(id));
  } else {
    bookingIds = [mongoose.Types.ObjectId(bookingId)];
  }

  return Installment.deleteMany(
    { booking: { $in: bookingIds }, transaction: { $lte: null } },
    { session },
  );
};

module.exports = {
  createInstallments,
  updatePaidInstallment,
  removeUnpaidInstallmentsForBookings,
};
