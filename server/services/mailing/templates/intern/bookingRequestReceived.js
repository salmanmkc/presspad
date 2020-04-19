const { greeting, content, link } = require('../htmlTags');

module.exports = () => {
  const loginLink = link('INTERN_LOGIN', 'login');

  return `
    ${greeting('Hi there,')}
    ${content(
      `Thank you for signing up to PressPad. Before the team can approve your online profile, you will need to ${loginLink} again and make some changes to it.`,
    )}
    ${content(
      `If you have any questions about the information needed for your online profile, please don’t hesitate to get in touch.`,
    )}
  `;
};
