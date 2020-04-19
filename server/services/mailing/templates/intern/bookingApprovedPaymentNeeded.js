const { greeting, content, link } = require('./../htmlTags');

module.exports = () => {
  const loginLink = link('INTERN_LOGIN', 'login');

  return `
    ${greeting('Hi there,')}
    ${content(
      `Your booking request has been accepted! Please ${loginLink} and fill in the payment information to complete the booking. Please do this within 48 hours, after which point your booking will be cancelled.`,
    )}
    ${content(
      `If you have any questions about your booking, please get in touch!`,
    )}
  `;
};
