const mongoose = require('mongoose');
const boom = require('boom');

const {
  updateCanceledBooking,
  updateAccounts,
  removeUnpaidInstallmentsForBookings,
  removePaymentsRemindersForBookings,
} = require('../../database/queries/payments');

const cancelBookingAfterPayment = async (req, res, next) => {
  const { id: bookingId } = req.params;
  const { role, _id: adminId } = req.user;

  const cancellationData = {
    ...req.body,
    hostRefund: req.body.hostRefund * 100,
    internRefund: req.body.internRefund * 100,
    organisationRefund: req.body.organisationRefund * 100,
    pressPadRefund: req.body.pressPadRefund * 100,
  };

  // Autherizations
  if (role !== 'admin')
    return next(boom.forbidden('only admin allow to confirm/cancel withdraw'));

  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();

    const updatedBooking = await updateCanceledBooking({
      bookingId,
      cancellationData,
      session,
    });

    const hostShare = 0.45 * updatedBooking.payedAmount;
    const deductFromHost = hostShare - req.body.hostRefund;
    if (deductFromHost < 0)
      return next(
        boom.badData(
          `can't give host more than "${hostShare}" his share from this booking `,
        ),
      );

    await Promise.all([
      updateAccounts({
        updatedBooking,
        cancellationData,
        adminId,
        session,
      }),
      removeUnpaidInstallmentsForBookings(bookingId, session),
      removePaymentsRemindersForBookings(bookingId, session),
    ]);

    await session.commitTransaction();
    session.endSession();

    return res.json({
      success: true,
    });
  } catch (error) {
    if (session && !session.hasEnded) {
      await session.abortTransaction();
      session.endSession();
    }

    return next(boom.badImplementation(error));
  }
};

module.exports = cancelBookingAfterPayment;
