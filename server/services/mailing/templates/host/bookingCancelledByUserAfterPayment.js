const { greeting, content } = require('../htmlTags');

module.exports = params => {
  return `
  ${greeting('Hi there,')}
  ${content(
    `IMPORTANT! Your booking with ${params.internName} has been cancelled. PressPad will be in touch shortly to resolve this personally.`,
  )}
  ${content(`If you have any questions, please get in touch!`)}
 `;
};
