/* eslint-disable no-nested-ternary */
const boom = require('boom');

const { getHostNextBooking } = require('../../database/queries/bookings');
const {
  hostDashboard: hostDashboardQuery,
} = require('../../database/queries/dashboard');
const { getHostPaymentsInfo } = require('../../database/queries/payments');

const hostDashboard = async (req, res, next) => {
  const { _id: hostId, role } = req.user;

  if (role !== 'host' && role !== 'superhost') {
    return next(boom.forbidden());
  }
  try {
    const [[dashboardData], [nextBooking], [paymentInfo]] = await Promise.all([
      // get full host dashboard data
      hostDashboardQuery(hostId),
      // get the next booking
      getHostNextBooking(hostId),
      // get payment infos
      getHostPaymentsInfo(hostId),
    ]);

    let nextBookingWithDetails;
    let accessibleFunds;
    let pending;
    let lastPayments;

    const {
      _id,
      email,
      name,
      profile,
      listing,
      reviews,
      bookings,
      notifications,
    } = dashboardData;

    const {
      withdrawalRequests,
      account: { currentBalance },
      pendingPayment,
      paymentHistory,
    } = paymentInfo;

    if (withdrawalRequests && withdrawalRequests.length) {
      const [_pendingWithdrawn] = withdrawalRequests.reduce(
        (acc, curr) => {
          if (curr.status === 'pending') {
            acc[0] += curr.amount;
          } else if (curr.status === 'transfered') {
            acc[1] += curr.amount;
          }
          return acc;
        },
        [0, 0],
      );
      accessibleFunds = currentBalance - pendingPayment - _pendingWithdrawn;
      pending = pendingPayment + _pendingWithdrawn;
    }

    if (paymentHistory && paymentHistory.length) {
      lastPayments = paymentHistory.sort((a, b) =>
        a.startDate > b.startDate
          ? 1
          : a.startDate === b.startDate
          ? a.endDate > b.endDate
            ? 1
            : -1
          : -1,
      );
      lastPayments = lastPayments.splice(0, 3);
    }

    if (nextBooking && nextBooking._id && bookings && bookings.length) {
      // get the next booking details
      nextBookingWithDetails = bookings.find(
        _item => _item._id.toString() === nextBooking._id.toString(),
      );
    }

    const output = {
      userData: { _id, email, name },
      profile,
      listing,
      reviews,
      notifications,
      nextBookingWithDetails,
      currentBalance: accessibleFunds,
      pending,
      lastPayments,
    };

    return res.json(output);
  } catch (err) {
    return next(boom.badImplementation(err));
  }
};

module.exports = hostDashboard;
