const { greeting, content, link } = require('../htmlTags');

module.exports = () => {
  const hostsLink = link('HOSTS_LINK', {}, 'here');

  return `
    ${greeting('Hi there,')}
    ${content(
      `Thanks for signing up to PressPad – your online profile has now been approved!`,
    )}
    ${content(
      `You can now start looking for your first media mentor-host ${hostsLink}!`,
    )}
    ${content(
      `If you need any help getting started or have any questions, please don’t hesitate to get in touch.`,
    )}
  `;
};
