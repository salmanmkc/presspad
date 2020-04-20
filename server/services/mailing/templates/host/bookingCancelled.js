const { greeting, content } = require('./../htmlTags');

module.exports = params => {
  return `
    ${greeting('Hi there,')}
    ${content(
      `We’re sorry but your recent booking has been cancelled because ${params.internName} didn’t confirm in time.`,
    )}
  `;
};
