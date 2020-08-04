const { greeting, content } = require('./../htmlTags');

module.exports = params => {
  return `
    ${greeting('Hi there,')}
    ${content(
      `A user has just deleted their PressPad account.
       Reasons provided: ${params.reason || 'N/A'}`,
    )}
  `;
};
