const { greeting, content, link } = require('../htmlTags');

module.exports = () => {
  const completeProfileLink = link('INTERN_COMPLETE_PROFILE', 'here');

  return `
  ${greeting('Hi there,')}
  ${content('Thanks for signing up to PressPad!')}
  ${content(
    `Our aim is to find you affordable accommodation, close to your journalism placement, with one of our top media mentor-hosts and we need you to click ${completeProfileLink} and complete your online profile so we can get things started!`,
  )}
  ${content(
    `If you have any questions, please don’t hesitate to get in touch with us!`,
  )}
  `;
};
