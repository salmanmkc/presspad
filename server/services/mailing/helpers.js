const { getBookingsDetails } = require('../../database/queries/bookings');

const getBookingUsersInfo = async ({
  bookingId,
  host: _host,
  intern: _intern,
}) => {
  let intern = _intern;
  let host = _host;

  if (!intern || !host) {
    const [booking = {}] = await getBookingsDetails(bookingId);
    intern = booking.intern;
    host = booking.host;
  }

  return { host, intern };
};

module.exports = { getBookingUsersInfo };
