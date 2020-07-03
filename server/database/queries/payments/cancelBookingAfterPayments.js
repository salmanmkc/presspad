const mongoose = require('mongoose');

const {
  Booking,
  Account,
  User,
  Coupon,
  InternalTransaction,
  WithdrawRequest,
} = require('../../models');
const { bookingStatuses } = require('../../../constants');

/**
 * Update cancellationDetails and status in the booking collection
 * This should work inside a transaction session
 * @param {object} obj
 * @param {string} obj.bookingId
 * @param {object} obj.cancellationData
 * @param {string} obj.cancellationData.cancellationReason
 * @param {string} obj.cancellationData.responsibleParty
 * @param {string} obj.cancellationData.notes
 * @param {number} obj.cancellationData.hostRefund
 * @param {number} obj.cancellationData.internRefund
 * @param {number} obj.cancellationData.organisationRefund
 * @param {number} obj.cancellationData.pressPadRefund
 * @param {session} obj.session
 */
const updateCanceledBooking = ({ bookingId, cancellationData, session }) => {
  const {
    cancellationReason,
    responsibleParty,
    notes,
    hostRefund,
    internRefund,
    organisationRefund,
    pressPadRefund,
  } = cancellationData;

  return Booking.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(bookingId) },
    {
      status: bookingStatuses.cancelledAfterPayment,
      cancellationDetails: {
        cancellationReason,
        responsibleParty,
        notes,
        refunds: {
          internRefund,
          hostRefund,
          organisationRefund,
          pressPadRefund,
        },
      },
    },
    { session, new: true },
  );
};

/**
 * Update accounts with the refund info
 * This should work inside a transaction session
 * @param {object} obj
 * @param {object} obj.updatedBooking
 * @param {string} obj.updatedBooking.intern
 * @param {string} obj.updatedBooking.host
 * @param {string} obj.updatedBooking.coupon
 * @param {string} obj.updatedBooking.payedAmount
 * @param {object} obj.cancellationData
 * @param {number} obj.cancellationData.hostRefund
 * @param {number} obj.cancellationData.internRefund
 * @param {number} obj.cancellationData.organisationRefund
 * @param {number} obj.cancellationData.pressPadRefund
 * @param {string} obj.adminId
 * @param {session} obj.session
 */
const updateAccounts = async ({
  updatedBooking,
  cancellationData,
  adminId,
  session,
}) => {
  const {
    hostRefund,
    internRefund,
    organisationRefund,
    // pressPadRefund,
  } = cancellationData;
  const { intern, host, coupon, payedAmount } = updatedBooking;

  const { account: hostAccount } = await User.findById(host);
  const { account: presspadAccount } = await User.findById(adminId);

  const queriesArr = [];
  const bulkWriteArr = [];
  if (internRefund > 0) {
    // create withdrawal request
    queriesArr.push(
      WithdrawRequest.create(
        [
          {
            user: intern,
            userType: 'intern',
            amount: internRefund,
          },
        ],
        { session },
      ),
    );
  }

  if (organisationRefund > 0) {
    const { organisationAccount } = await Coupon.findById(coupon);

    // update organisation account
    bulkWriteArr.push({
      updateOne: {
        filter: { _id: organisationAccount },
        update: {
          $inc: { currentBalance: organisationRefund },
        },
      },
    });

    queriesArr.push(
      InternalTransaction.create(
        [
          {
            user: adminId,
            from: presspadAccount,
            to: organisationAccount,
            amount: organisationRefund,
            type: 'refund',
          },
        ],
        { session },
      ),
    );
  }

  const hostShare = 0.45 * payedAmount;
  const deductFromHost = hostShare - hostRefund;

  if (deductFromHost > 0) {
    // update host account
    bulkWriteArr.push({
      updateOne: {
        filter: { _id: hostAccount },
        update: {
          $inc: {
            currentBalance: -1 * deductFromHost,
            income: -1 * deductFromHost,
          },
        },
      },
    });

    queriesArr.push(
      InternalTransaction.create(
        [
          {
            user: adminId,
            from: hostAccount,
            to: presspadAccount,
            amount: deductFromHost,
            type: 'refund',
          },
        ],
        { session },
      ),
    );
  }

  // subtract what have been taking out of host share
  // the refund for intern would be discounted when the admin actually
  // transfer the withdrawn request
  const deductFromHostingIncome = organisationRefund - deductFromHost;
  const deductFromBursary = 0.1 * deductFromHostingIncome;

  if (deductFromHostingIncome > 0) {
    // update presspad account
    bulkWriteArr.push({
      updateOne: {
        filter: { _id: presspadAccount },
        update: {
          $inc: {
            hostingIncome: -1 * (deductFromHostingIncome - deductFromBursary),
            bursaryFunds: -1 * deductFromBursary,
          },
        },
      },
    });
  }

  queriesArr.push(Account.bulkWrite(bulkWriteArr, { session }));

  return Promise.all(queriesArr);
};

module.exports = { updateCanceledBooking, updateAccounts };
