const sendMail = require('./templates');
const { getBookingUsersInfo } = require('./helpers');

module.exports = async ({
  role,
  type,
  bookingId,
  host: _host,
  intern: _intern,
}) => {
  const { host, intern } = await getBookingUsersInfo({
    bookingId,
    host: _host,
    intern: _intern,
  });

  if (type === 'beforePayment') {
    // email to host
    await sendMail({
      type:
        role === 'host'
          ? 'BOOKING_CANCELLED_BY_HOST_BEFORE_PAYMENT'
          : 'BOOKING_CANCELLED_BY_INTERN_BEFORE_PAYMENT',
      userType: 'host',
      params: { to: host.email, internName: intern.name },
    });

    // email to intern
    await sendMail({
      type:
        role === 'host'
          ? 'BOOKING_CANCELLED_BY_HOST_BEFORE_PAYMENT'
          : 'BOOKING_CANCELLED_BY_INTERN_BEFORE_PAYMENT',
      userType: 'intern',
      params: { to: intern.email, hostName: host.name },
    });
  }

  if (type === 'afterPayment') {
    // email to host
    await sendMail({
      type: 'BOOKING_CANCELLED_BY_USER_AFTER_PAYMENT',
      userType: 'host',
      params: { to: host.email, internName: intern.name },
    });

    // email to intern
    await sendMail({
      type: 'BOOKING_CANCELLED_BY_USER_AFTER_PAYMENT',
      userType: 'intern',
      params: { to: intern.email, hostName: host.name },
    });
  }
};
