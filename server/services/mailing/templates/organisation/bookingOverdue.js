const { greeting, content } = require('../htmlTags');

module.exports = params => {
  return `
    ${greeting('Hi there,')}
    ${content(
      `${params.internName}’s payment is now nine days overdue and their booking has been terminated.`,
    )}
    ${content(
      `A member of the PressPad Team will be in touch with you shortly to help resolve the issue.`,
    )}
  `;
};
