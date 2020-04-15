const { link } = require('./../htmlTags');

module.exports = params => {
  const bookingLink = link(
    'SINGLE_BOOKING',
    { bookingId: params.bookingId },
    'here',
  );

  const guidanceLink = link('HOST_GUIDANCE', {}, 'here');

  return `
  <main>
    <p>Hi there,</p>
    <p>
      In one week’s time, you’ll be welcoming your intern into your home. We have compiled some useful guidance and resources for you ${guidanceLink}, so have a look before they arrive.
    </p>
    <p>
      You can also ${bookingLink} here to view the details of your booking.
    </p>
  </main>
  `;
};
