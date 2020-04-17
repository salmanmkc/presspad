const { link, greeting, content } = require('./../htmlTags');

module.exports = () => {
  const loginLink = link('HOST_LOGIN', {}, 'here');

  return `
  ${greeting('Hi there,')}
  ${content('Thanks for signing up to PressPad!')}
  ${content(
    `To be listed as a media mentor-host on our website, you’ll need to login ${loginLink} and complete your online profile.`,
  )}
  ${content(
    `Once you’ve done that, we can get the ball rolling and find you an intern to host and mentor for the duration of their placement.`,
  )}
  ${content(
    `If you have any questions, please don’t hesitate to get in touch with us!`,
  )}
  `;
};
