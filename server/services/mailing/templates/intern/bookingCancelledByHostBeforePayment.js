const { greeting, content, link } = require('../htmlTags');

module.exports = params => {
  const loginLink = link('INTERN_LOGIN', 'login');

  return `
    ${greeting('Hi there,')}
    ${content(
      `We’re sorry to tell you that ${params.hostName} has decided to cancel your booking. We confirm we have not taken any payment.`,
    )}
    ${content(
      `Bookings get cancelled for a number of reasons (thankfully, this is rare!) and we’re sure you’ll be able to find another top media mentor-host to stay with during your placement. Please ${loginLink} here to search and make another booking.`,
    )}
    ${content(
      `If you have any questions about making another booking, please get in touch!`,
    )}
  `;
};
