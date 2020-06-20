const Booking = require('../../models/Booking');

const { bookingStatuses } = require('../../../constants');

const reset = () => Booking.deleteMany();

const update = (couponID, bookingId) =>
  Booking.findByIdAndUpdate(bookingId, { coupon: couponID }, { new: true });

const createAll = async ({ users, listings, couponDiscountRate }) => {
  const { internUser, hostUser, hostUser2 } = users;
  const { LondonListing } = listings;

  await reset();
  const bookings = [
    // completed
    {
      listing: LondonListing._id,
      intern: internUser,
      host: hostUser,
      startDate: Date.now() - 20 * 24 * 60 * 60 * 1000,
      endDate: Date.now() - 15 * 24 * 60 * 60 * 1000,
      status: bookingStatuses.completed,
      price: 0, // because first two weeks always free
      payedAmount: 0,
      moneyGoTo: 'host',
    },
    // pending - awaiting host
    {
      listing: LondonListing._id,
      intern: internUser,
      host: hostUser,
      startDate: Date.now() + 15 * 24 * 60 * 60 * 1000,
      endDate: Date.now() + 20 * 24 * 60 * 60 * 1000,
      status: bookingStatuses.pending,
      price: 0, // because first two weeks always free
      payedAmount: 0,
      moneyGoTo: 'host',
    },
    // accepted & not paid one payment
    {
      listing: LondonListing._id,
      intern: internUser,
      host: hostUser,
      startDate: Date.now() + 25 * 24 * 60 * 60 * 1000,
      endDate: Date.now() + 50 * 24 * 60 * 60 * 1000,
      status: bookingStatuses.accepted,
      price: 24000,
      payedAmount: 0,
      moneyGoTo: 'presspad',
    },
    // accepted & not paid installments applicable
    {
      listing: LondonListing._id,
      intern: internUser,
      host: hostUser,
      startDate: Date.now() + 51 * 24 * 60 * 60 * 1000,
      endDate: Date.now() + 110 * 24 * 60 * 60 * 1000,
      status: bookingStatuses.accepted,
      price: 92000,
      payedAmount: 0,
      moneyGoTo: 'presspad',
    },
    // confirmed (less than two weeks, free)
    {
      listing: LondonListing._id,
      intern: internUser,
      host: hostUser,
      startDate: Date.now() + 116 * 24 * 60 * 60 * 1000,
      endDate: Date.now() + 126 * 24 * 60 * 60 * 1000,
      status: bookingStatuses.confirmed,
      price: 0,
      payedAmount: 0,
      moneyGoTo: 'presspad',
    },
    // confirmed & paid (upfront)
    {
      listing: LondonListing._id,
      intern: internUser,
      host: hostUser,
      startDate: Date.now() + 130 * 24 * 60 * 60 * 1000,
      endDate: Date.now() + 148 * 24 * 60 * 60 * 1000,
      status: bookingStatuses.confirmed,
      price: 10000,
      payedAmount: 10000,
      moneyGoTo: 'presspad',
    },
    // confirmed & paid (first payment)
    // 140 + 280 + 40  // applied 50% coupon
    {
      listing: LondonListing._id,
      intern: internUser,
      host: hostUser,
      startDate: Date.now() + 151 * 24 * 60 * 60 * 1000,
      endDate: Date.now() + 210 * 24 * 60 * 60 * 1000,
      status: bookingStatuses.confirmed,
      price: 92000,
      payedAmount: 14000 + 46000,
      moneyGoTo: 'host',
    },
    // cancelled
    {
      listing: LondonListing._id,
      intern: internUser,
      host: hostUser,
      startDate: Date.now() - 45 * 24 * 60 * 60 * 1000,
      endDate: Date.now() - 40 * 24 * 60 * 60 * 1000,
      status: bookingStatuses.cancelled,
      price: 12000,
      payedAmount: 0,
      moneyGoTo: 'host',
    },
    // rejected
    {
      listing: LondonListing._id,
      intern: internUser,
      host: hostUser,
      startDate: Date.now() - 35 * 24 * 60 * 60 * 1000,
      endDate: Date.now() - 30 * 24 * 60 * 60 * 1000,
      status: bookingStatuses.rejected,
      price: 12000,
      payedAmount: 0,
      moneyGoTo: 'host',
    },
    // awaitingAdmin and host does accept automatically
    {
      listing: LondonListing._id,
      intern: internUser,
      host: hostUser,
      startDate: Date.now() + 45 * 24 * 60 * 60 * 1000,
      endDate: Date.now() + 80 * 24 * 60 * 60 * 1000,
      status: bookingStatuses.awaitingAdmin,
      price: 44000,
      payedAmount: 0,
      moneyGoTo: 'host',
    },
    // awaiting admin and host doesn't accept automatically
    {
      listing: LondonListing._id,
      intern: internUser,
      host: hostUser2,
      startDate: Date.now() + 45 * 24 * 60 * 60 * 1000,
      endDate: Date.now() + 80 * 24 * 60 * 60 * 1000,
      status: bookingStatuses.awaitingAdmin,
      price: 44000,
      payedAmount: 0,
      moneyGoTo: 'host',
    },
  ];

  const [
    completedBooking,
    pendingBooking,
    acceptedNotPaidOnePayment,
    acceptedNotPaidInstallmentApplicable,
    confirmedFree,
    confirmedPaidUpfront,
    confirmedPaidFirst,
    cancelledBooking,
    rejectedBooking,
    awaitingAdminBooking,
    awaitingAdminNotAutomaticBooking,
  ] = await Booking.create(bookings);

  return {
    completedBooking,
    pendingBooking,
    acceptedNotPaidOnePayment,
    acceptedNotPaidInstallmentApplicable,
    confirmedFree,
    confirmedPaidUpfront,
    confirmedPaidFirst,
    cancelledBooking,
    rejectedBooking,
    awaitingAdminBooking,
    awaitingAdminNotAutomaticBooking,
  };
};

module.exports = {
  createAll,
  reset,
  update,
};
