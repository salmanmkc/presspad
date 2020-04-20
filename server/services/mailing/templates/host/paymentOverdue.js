const { greeting, content } = require('./../htmlTags');

module.exports = params => {
  return `
  ${greeting('Hi there,')}
  ${content(
    `The payment from ${params.internName} is now overdue. We have told them that they need to make the payment within the next 48 hours or the booking will be terminated.`,
  )}
  ${content(`If you have any questions, please get in touch with us.`)}
  `;
};
