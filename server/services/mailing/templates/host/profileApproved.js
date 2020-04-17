const { greeting, content } = require('./../htmlTags');

module.exports = () => {
  return `
  ${greeting('Hi there,')}
  ${content('Thanks for signing up to PressPad recently!')}
  ${content(
    'If you have any questions, please don’t hesitate to get in touch.',
  )}
  `;
};
