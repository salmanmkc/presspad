const { link, greeting, content } = require('./../htmlTags');

module.exports = params => {
  const bookingLink = link(
    'SINGLE_BOOKING',
    { bookingId: params.bookingId },
    'here',
  );

  const guidanceLink = link('HOST_GUIDANCE', {}, 'here');

  return `
  ${greeting('Hi there,')}
  ${content(
    `In one week’s time, you’ll be welcoming your intern into your home. We have compiled some useful guidance and resources for you ${guidanceLink}, so have a look before they arrive.`,
  )}
  ${content(
    `You can also ${bookingLink} here to view the details of your booking.`,
  )}
  `;
};
