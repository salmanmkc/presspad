const { greeting, content } = require('../htmlTags');

module.exports = () => {
  return `
    ${greeting('Hi there,')}
    ${content(
      `Thank you for your recent booking and payment. Unfortunately, your host has cancelled the booking.`,
    )}
    ${content(
      `A member of the PressPad Team will be touch with you soon to discuss the options.`,
    )}
  `;
};
