const sendMail = require('./templates');
const { getBookingsDetails } = require('../../database/queries/bookings');
const { getUserById } = require('../../database/queries/user');

module.exports = async ({ bookingId, host: _host, intern: _intern }) => {
  let intern = _intern;
  let host = _host;
  const organisation = await getUserById(intern.organisation);

  if (!intern || !host) {
    const booking = await getBookingsDetails(bookingId);
    intern = booking.intern;
    host = booking.host;
  }

  await sendMail({
    type: 'BOOKING_UPDATE_WAITING_FOR_PAYMENT',
    userType: 'host',
    params: { to: host.email },
  });

  await sendMail({
    type: 'BOOKING_APPROVED_PAYMENT_NEEDED',
    userType: 'intern',
    params: { to: intern.email },
  });

  await sendMail({
    type: 'BOOKING_ACCEPTED',
    userType: 'organisation',
    params: { to: organisation.email },
  });
};
