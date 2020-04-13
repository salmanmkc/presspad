const Booking = require('../../models/Booking');

const reset = () => Booking.deleteMany();

const update = couponID =>
  Booking.findOneAndUpdate({ status: 'pending' }, { coupon: couponID });

const createAll = async ({ users, listings }) => {
  const { internUser, hostUser } = users;
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
      status: 'completed',
      price: 12000,
      payedAmount: 12000,
      moneyGoTo: 'host',
    },
    // pending - awaiting host
    {
      listing: LondonListing._id,
      intern: internUser,
      host: hostUser,
      startDate: Date.now() + 15 * 24 * 60 * 60 * 1000,
      endDate: Date.now() + 20 * 24 * 60 * 60 * 1000,
      status: 'pending',
      price: 12000,
      payedAmount: 0,
      moneyGoTo: 'host',
    },
    // accepted & not paid
    {
      listing: LondonListing._id,
      intern: internUser,
      host: hostUser,
      startDate: Date.now() + 25 * 24 * 60 * 60 * 1000,
      endDate: Date.now() + 30 * 24 * 60 * 60 * 1000,
      status: 'accepted',
      price: 12000,
      payedAmount: 0,
      moneyGoTo: 'presspad',
    },
    // confirmed & paid (first payment)
    {
      listing: LondonListing._id,
      intern: internUser,
      host: hostUser,
      startDate: Date.now() + 31 * 24 * 60 * 60 * 1000,
      endDate: Date.now() + 35 * 24 * 60 * 60 * 1000,
      status: 'confirmed',
      price: 10000,
      payedAmount: 3333,
      moneyGoTo: 'presspad',
    },
    // cancelled
    {
      listing: LondonListing._id,
      intern: internUser,
      host: hostUser,
      startDate: Date.now() - 45 * 24 * 60 * 60 * 1000,
      endDate: Date.now() - 40 * 24 * 60 * 60 * 1000,
      status: 'pending',
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
      status: 'rejected',
      price: 12000,
      payedAmount: 0,
      moneyGoTo: 'host',
    },
    // awaitingAdmin
    {
      listing: LondonListing._id,
      intern: internUser,
      host: hostUser,
      startDate: Date.now() + 45 * 24 * 60 * 60 * 1000,
      endDate: Date.now() + 80 * 24 * 60 * 60 * 1000,
      status: 'awaiting admin',
      price: 12000,
      payedAmount: 0,
      moneyGoTo: 'host',
    },
  ];

  const [
    completedBooking,
    pendingBooking,
    confirmedNotPaid,
    confirmedPaidFirst,
    cancelledBooking,
    rejectedBooking,
    awaitingAdminBooking,
  ] = await Booking.create(bookings);

  return {
    completedBooking,
    pendingBooking,
    confirmedNotPaid,
    confirmedPaidFirst,
    cancelledBooking,
    rejectedBooking,
    awaitingAdminBooking,
  };
};

module.exports = {
  createAll,
  reset,
  update,
};
