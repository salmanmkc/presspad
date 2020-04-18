const sendMail = require('./templates');
const { getBookingsDetails } = require('../../database/queries/bookings');

module.exports = async ({
  bookingId,
  host: _host,
  intern: _intern,
  rejectedBy,
}) => {
  let intern = _intern;
  let host = _host;

  if (!intern || !host) {
    const booking = await getBookingsDetails(bookingId);
    intern = booking.intern;
    host = booking.host;
  }

  if (rejectedBy === 'host') {
    await await sendMail({
      type: 'BOOKING_CANCELED_BY_HOST',
      userType: 'host',
      params: { to: host.email, internName: intern.name },
    });
  }
};
