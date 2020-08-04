const { greeting, content } = require('../htmlTags');

module.exports = params => {
  return `
  ${greeting('Hi there,')}
  ${content(
    `This is confirming that you have cancelled your booking with ${params.internName}. We confirm we have not taken any payment.`,
  )}
  ${content(`If you have any questions, please get in touch!`)}
 `;
};
