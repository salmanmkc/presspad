const { greeting, content, link } = require('../htmlTags');

module.exports = params => {
  const bookingLink = link(
    'SINGLE_BOOKING',
    { bookingId: params.bookingId },
    'here',
  );

  return `
    ${greeting('Hi there,')}
    ${content(
      `Thank you for your recent booking. Unfortunately, it has been rejected on this occasion. Please click ${bookingLink} to find out why and what to do next.`,
    )}
    ${content(
      `We are really sorry it hasn’t been possible for you to stay with this host this time. If you have any questions or need help with making another booking, please get in touch!`,
    )}
  `;
};
