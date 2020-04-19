const { link, greeting, content } = require('./../htmlTags');

module.exports = params => {
  const bookingLink = link('SINGLE_BOOKING', 'here', {
    bookingId: params.bookingId,
  });

  return `
  ${greeting('Hi there,')}
  ${content(
    `We can confirm that ${params.internName} will be staying with ${params.hostName} for the duration of their placement!`,
  )}
  ${content(`Click ${bookingLink} to view the details of your booking.`)}
  ${content(
    `  We will now leave you two to get to know each other! We’ll be back in touch before the placement but in the meantime, please let us know if you have any questions.`,
  )}
  `;
};
