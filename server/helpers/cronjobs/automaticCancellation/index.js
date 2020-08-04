const pubSub = require('../../../pubSub');
const {
  getUnpaidOverDueBookings,
  getPaidOverDueBookingsNDays,
} = require('../../../database/queries/bookings');
const Booking = require('../../../database/models/Booking');
const { bookingStatuses } = require('../../../constants');
const { registerNotification } = require('../../../services/notifications');

const unpaidAutomaticCancellation = async Sentry => {
  try {
    const unpaidOverDueBookings = await getUnpaidOverDueBookings();

    if (!unpaidOverDueBookings.length) return null;

    const unpaidBookingsIds = unpaidOverDueBookings.map(booking => booking._id);

    // to send emails / updates not implemented yet
    unpaidBookingsIds.forEach(bookingId => {
      pubSub.emit(pubSub.events.booking.UNPAID_AUTOMATIC_CANCELLED, {
        bookingId,
      });
    });

    await Booking.updateMany(
      { _id: { $in: unpaidBookingsIds } },
      {
        status: bookingStatuses.cancelled,
        cancelledBy: null,
        'cancellationDetails.automaticCancellation': true,
      },
    );

    const notifications = [];
    unpaidOverDueBookings.forEach(booking => {
      notifications.push(
        // notify Intern
        {
          user: booking.intern,
          secondParty: booking.host,
          type: 'cancelledBeforePayments',
          booking: booking._id,
          private: true,
        },
        // notify Host
        {
          user: booking.host,
          secondParty: booking.intern,
          type: 'cancelledBeforePayments',
          booking: booking._id,
          private: true,
        },
      );
    });

    await registerNotification(notifications);
  } catch (error) {
    Sentry.captureException(error);
  }
};

const paidAutomaticCancellation7DaysWarning = async Sentry => {
  try {
    const paidOverDueBookings7Days = await getPaidOverDueBookingsNDays(
      'warning',
    );
    if (!paidOverDueBookings7Days.length) return null;

    // to send emails / updates not implemented yet
    paidOverDueBookings7Days.forEach(booking => {
      pubSub.emit(pubSub.events.booking.PAID_AUTOMATIC_CANCEL_WARNING, {
        bookingId: booking._id,
      });
    });

    const notifications = [];
    paidOverDueBookings7Days.forEach(booking => {
      notifications.push(
        // notify Intern
        {
          user: booking.intern,
          secondParty: booking.host,
          type: 'paymentOverDue',
          booking: booking._id,
          private: true,
        },
        // notify Host
        {
          user: booking.host,
          secondParty: booking.intern,
          type: 'paymentOverDue',
          booking: booking._id,
          private: true,
        },
      );
    });
    await registerNotification(notifications);
  } catch (error) {
    Sentry.captureException(error);
  }
};

const paidAutomaticCancellation = async Sentry => {
  try {
    const paidOverDueBookings9Days = await getPaidOverDueBookingsNDays(
      'terminate',
    );

    if (!paidOverDueBookings9Days.length) return null;

    const paidOverDueBookingsIds = paidOverDueBookings9Days.map(
      booking => booking._id,
    );

    // to send emails / updates not implemented yet
    paidOverDueBookingsIds.forEach(bookingId => {
      pubSub.emit(pubSub.events.booking.PAID_AUTOMATIC_CANCELLED, {
        bookingId,
      });
    });

    await Booking.updateMany(
      { _id: { $in: paidOverDueBookingsIds } },
      {
        status: bookingStatuses.awaitingCancellation,
        cancelledBy: null,
        'cancellationDetails.automaticCancellation': true,
      },
    );

    const notifications = [];
    paidOverDueBookings9Days.forEach(booking => {
      notifications.push(
        // notify Intern
        {
          user: booking.intern,
          secondParty: booking.host,
          type: 'bookingTerminated',
          booking: booking._id,
          private: false,
        },
        // notify Host
        {
          user: booking.host,
          secondParty: booking.intern,
          type: 'bookingTerminated',
          booking: booking._id,
          private: true,
        },
      );
    });
    await registerNotification(notifications);
  } catch (error) {
    Sentry.captureException(error);
  }
};

module.exports = {
  unpaidAutomaticCancellation,
  paidAutomaticCancellation7DaysWarning,
  paidAutomaticCancellation,
};
