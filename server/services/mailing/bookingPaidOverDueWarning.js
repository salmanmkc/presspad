const sendMail = require('./templates');
const { getBookingUsersInfo } = require('./helpers');

module.exports = async ({ bookingId, host: _host, intern: _intern }) => {
  const { host, intern } = await getBookingUsersInfo({
    bookingId,
    host: _host,
    intern: _intern,
  });

  await sendMail({
    type: 'PAYMENT_OVERDUE',
    userType: 'intern',
    params: { to: intern.email },
  });

  await sendMail({
    type: 'PAYMENT_OVERDUE',
    userType: 'host',
    params: { to: host.email, internName: intern.name },
  });

  // todo send to admin if there is
};
