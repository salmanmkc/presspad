const sendMail = require('./templates');
const { getBookingUsersInfo } = require('./helpers');

module.exports = async ({
  bookingId,
  host: _host,
  intern: _intern,
  rejectedBy,
}) => {
  const { host, intern } = await getBookingUsersInfo({
    bookingId,
    host: _host,
    intern: _intern,
  });
  if (rejectedBy === 'host') {
    await sendMail({
      type: 'BOOKING_CANCELED_BY_HOST',
      userType: 'host',
      params: { to: host.email, internName: intern.name },
    });

    await sendMail({
      type: 'BOOKING_REJECTED',
      userType: 'intern',
      params: { to: intern.email, bookingId },
    });
  }

  if (rejectedBy === 'admin') {
    //
  }
};
