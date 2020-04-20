const sendMail = require('./templates');
const { getBookingUsersInfo } = require('./helpers');

module.exports = async ({ bookingId, host: _host }) => {
  const { host } = await getBookingUsersInfo({
    bookingId,
    host: _host,
  });

  await sendMail({
    type: 'BOOKIN_REQUEST',
    userType: 'host',
    params: { to: host.email, bookingId },
  });
};
