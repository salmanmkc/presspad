const { greeting, content } = require('./../htmlTags');

module.exports = params => {
  return `
  ${greeting('Hi there,')}
  ${content(
    `This is confirming that you have rejected a booking request from ${params.internName}.`,
  )}
  ${content(`If you have any questions, please get in touch!`)}
 `;
};
