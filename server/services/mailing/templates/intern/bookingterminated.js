const { greeting, content } = require('../htmlTags');

module.exports = () => {
  return `
    ${greeting('Hi there,')}
    ${content(
      `We’re sorry to inform you that your booking has been terminated because we have not received your overdue payment.`,
    )}
    ${content(
      `A member of the PressPad Team will be in touch shortly to help resolve this.`,
    )}
  `;
};
