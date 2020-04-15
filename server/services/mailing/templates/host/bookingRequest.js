const { link } = require('./../htmlTags');

module.exports = params => {
  const bookingLink = link(
    'SINGLE_BOOKING',
    { bookingId: params.bookingId },
    'here',
  );

  return `
  <main>
    <p>Hi there,</p>
    <p>
      Congratulations! You have a booking request! 
    </p>
    <p>
      Please click ${bookingLink} for the details and to respond.
    </p>
    <p>
      If you have any questions, please don’t hesitate to get in touch.
    </p>
  </main>
  `;
};
