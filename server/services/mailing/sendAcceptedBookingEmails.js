const sendMail = require('./templates');
const { getUserById } = require('../../database/queries/user');
const { getBookingUsersInfo } = require('./helpers');

module.exports = async ({ bookingId, host: _host, intern: _intern }) => {
  const { intern, host } = await getBookingUsersInfo({
    bookingId,
    intern: _intern,
    host: _host,
  });

  const organisation = await getUserById(intern.organisation);

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
