const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Booking = require('../../models/Booking');

const { bookingStatuses } = require('../../../constants');

module.exports.getTopAdminStats = async () => {
  const interns = await User.find({ role: 'intern' });
  const hosts = await User.find({ role: 'host' });
  const approvalRequests = await Profile.find({ awaitingReview: true });
  const liveBookings = await Booking.find({
    $or: [
      { status: bookingStatuses.accepted },
      { status: bookingStatuses.confirmed },
    ],
  });
  const bookingRequests = await Booking.find({
    status: bookingStatuses.awaitingAdmin,
  });

  return {
    interns: interns.length,
    hosts: hosts.length,
    approvalRequests: approvalRequests.length,
    liveBookings: liveBookings.length,
    bookingRequests: bookingRequests.length,
  };
};
