const { greeting, content, link } = require('../htmlTags');

module.exports = () => {
  const completeProfileLink = link('INTERN_COMPLETE_PROFILE', {}, 'here');

  return `
    ${greeting('Hi there,')}
    ${content(`Thanks for signing up to PressPad recently!`)}
    ${content(
      `So that we can match you with one of our media mentor-hosts, we need you to click ${completeProfileLink} and complete your online profile.`,
    )}
    ${content(
      `If you have any questions, please don’t hesitate to get in touch with us!`,
    )}
  `;
};
