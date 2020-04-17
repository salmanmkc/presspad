const { greeting, content } = require('../htmlTags');

module.exports = () => {
  return `
    ${greeting('Hi there,')}
    ${content(
      `Your payment is now overdue. Please make this payment within the next 48 hours or your booking will be terminated.`,
    )}
    ${content(
      `If there are any problems with making this payment, please get in touch with us.`,
    )}
  `;
};
