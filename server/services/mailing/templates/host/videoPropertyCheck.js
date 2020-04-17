const { greeting, content } = require('./../htmlTags');

module.exports = () => {
  return `
  ${greeting('Hi there,')}
  ${content('Thanks for completing your profile.')}
  ${content(
    'Once the PressPad Team has reviewed your details and completed the video property check, your listing will go live!',
  )}
  ${content(
    'If you have any questions, please don’t hesitate to get in touch with us!',
  )}
  `;
};
