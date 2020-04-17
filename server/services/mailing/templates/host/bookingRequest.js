const { link, greeting, content } = require('./../htmlTags');

module.exports = params => {
  const bookingLink = link(
    'SINGLE_BOOKING',
    { bookingId: params.bookingId },
    'here',
  );

  return `
    ${greeting('Hi there,')}
    ${content(`Congratulations! You have a booking request!`)}
    ${content(`Please click ${bookingLink} for the details and to respond.`)}
    ${content(
      `If you have any questions, please don’t hesitate to get in touch.`,
    )}
  `;
};
