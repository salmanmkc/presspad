const { link } = require('./../htmlTags');

module.exports = params => {
  const bookingLink = link(
    'SINGLE_BOOKING',
    { bookingId: params.bookingId },
    'here',
  );

  return `
  <main>
    <p>Hi both,</p>
    <p>  
      We can confirm that ${params.internName} will be staying with ${params.hostName} for the duration of their placement!
      </p>
    <p>
      Click ${bookingLink} to view the details of your booking.
    </p>
    <p>
      We will now leave you two to get to know each other! We’ll be back in touch before the placement but in the meantime, please let us know if you have any questions.
    </p>
  </main>
  `;
};
