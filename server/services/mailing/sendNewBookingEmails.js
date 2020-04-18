const sendMail = require('./templates');
const { getBookingsDetails } = require('../../database/queries/bookings');

module.exports = async ({ bookingId, host: _host, intern: _intern }) => {
  let intern = _intern;
  let host = _host;

  if (!intern || !host) {
    const booking = await getBookingsDetails(bookingId);
    intern = booking.intern;
    host = booking.host;
  }

  await sendMail({
    type: 'BOOKIN_REQUEST',
    userType: 'host',
    params: { to: host.email, bookingId },
  });
};