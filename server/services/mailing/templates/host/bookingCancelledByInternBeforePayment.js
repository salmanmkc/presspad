const { greeting, content, link } = require('../htmlTags');

module.exports = params => {
  return `
    ${greeting('Hi there,')}
    ${content(
      `We’re sorry to tell you that ${params.internName} has decided to cancel their booking with you. We confirm we have not taken any payment.`,
    )}
    ${content(`If you have any questions, please get in touch!`)}
  `;
};
