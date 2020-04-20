const { greeting, content } = require('./../htmlTags');

module.exports = () => {
  return `
  ${greeting('Hi there,')}
  ${content(
    `We’re sorry to tell you that your intern has requested to cancel their booking.`,
  )}
  ${content(
    `One of the PressPad Team will be in touch with you shortly to discuss the options.`,
  )}
  `;
};
