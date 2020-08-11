/* eslint-disable no-nested-ternary */
const boom = require('boom');

const { getUpcomingBooking } = require('../../database/queries/bookings');
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
      getUpcomingBooking({ userId: hostId, role }),
      // get payment infos
      getHostPaymentsInfo(hostId),
      // get recent payments
    ]);

    let accessibleFunds;
    let pending;
    let recentPayments;

    const {
      _id,
      email,
      name,
      acceptAutomatically,
      listing,
      reviews,
      notifications,
      profileCompleted,
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
    if (paymentHistory && paymentHistory.length > 0) {
      recentPayments = paymentHistory
        .sort((a, b) =>
          a.transactionDates[a.transactionDates.length - 1] >
          b.transactionDates[b.transactionDates.length - 1]
            ? -1
            : 1,
        )
        .splice(0, 3);
    }

    const output = {
      userData: { _id, email, name, acceptAutomatically },
      listing,
      reviews,
      profileCompleted,
      notifications,
      nextBooking,
      accessibleFunds,
      pending,
      lastPayments: recentPayments,
    };

    return res.json(output);
  } catch (err) {
    return next(boom.badImplementation(err));
  }
};

module.exports = hostDashboard;
