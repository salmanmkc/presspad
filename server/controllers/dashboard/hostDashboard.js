const boom = require('boom');

const { getHostNextBooking } = require('../../database/queries/bookings');
const {
  hostDashboard: hostDashboardQuery,
} = require('../../database/queries/dashboard');
const { getHostPaymentsInfo } = require('../../database/queries/payments');

const generateFileURL = require('../../helpers/generateFileURL');

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
    } = paymentInfo;

    // console.log('ppp', currentBalance, pendingPayment, withdrawalRequests);

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
      console.log('ppp', currentBalance, pendingPayment, _pendingWithdrawn);
      accessibleFunds = currentBalance - pendingPayment - _pendingWithdrawn;
      pending = pendingPayment + _pendingWithdrawn;
    }

    if (nextBooking && nextBooking._id && bookings && bookings.length) {
      // get the next booking details
      nextBookingWithDetails = bookings.find(
        _item => _item._id.toString() === nextBooking._id.toString(),
      );

      if (nextBookingWithDetails) {
        const {
          intern: { profile: internProfile },
        } = nextBookingWithDetails;
        if (internProfile && internProfile.profileImage) {
          // get intern's profile image of next booking
          generateFileURL(internProfile.profileImage);
        }
      }
    }

    if (profile && profile.profileImage) generateFileURL(profile.profileImage);

    const output = {
      userData: { _id, email, name },
      profile,
      listing,
      reviews,
      notifications,
      nextBookingWithDetails,
      currentBalance: accessibleFunds,
      pending,
    };

    console.log(output);
    return res.json(output);
  } catch (err) {
    return next(boom.badImplementation(err));
  }
};

module.exports = hostDashboard;
