const { link, greeting, content } = require('./../htmlTags');

module.exports = () => {
  const completeProfileLink = link('HOST_COMPLETE_PROFILE', {}, 'here');

  return `
  ${greeting('Hi there,')}
  ${content('Thanks for signing up to PressPad recently!')}
  ${content(
    `So that we can let our interns know about you, we need you to click ${completeProfileLink} and complete your online profile!`,
  )}
  ${content(
    'If you have any questions, please don’t hesitate to get in touch with us!',
  )}
  `;
};
