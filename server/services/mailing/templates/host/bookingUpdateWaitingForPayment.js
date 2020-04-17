const { greeting, content } = require('./../htmlTags');

module.exports = () => {
  return `
  ${greeting('Hi there,')}
  ${content(
    `The booking with your intern is almost complete – we are just awaiting payment from them.`,
  )}
  ${content(`We will be in touch as soon as we’ve received it!`)}
  `;
};
