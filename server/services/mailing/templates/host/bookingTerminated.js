const { greeting, content } = require('./../htmlTags');

module.exports = params => {
  return `
  ${greeting('Hi there,')}
  ${content(
    `We’re sorry to inform you that your ${params.internName}’s booking has been terminated because we have not received the overdue payment from them.`,
  )}
  ${content(
    `A member of the PressPad Team will be in touch shortly to help resolve this.`,
  )}
  `;
};
