const { greeting, content } = require('../htmlTags');

const rejected = params => {
  const { adminMessage } = params;
  return `
    ${greeting('Hi there,')}
    ${content(`lorem ipsum ${adminMessage || ''}!`)}
    ${content(
      `If you need any help getting started or have any questions, please don’t hesitate to get in touch.`,
    )}
  `;
};

const preApproved = params => {
  const { adminMessage } = params;
  return `
    ${greeting('Hi there,')}
    ${content(`lorem ipsum ${adminMessage || ''}!`)}
    ${content(
      `If you need any help getting started or have any questions, please don’t hesitate to get in touch.`,
    )}
  `;
};

const approved = params => {
  const { adminMessage } = params;
  return `
    ${greeting('Hi there,')}
    ${content(`lorem ipsum ${adminMessage || ''}!`)}
    ${content(
      `If you need any help getting started or have any questions, please don’t hesitate to get in touch.`,
    )}
  `;
};

const inviteToInterView = params => {
  const { adminMessage } = params;
  return `
    ${greeting('Hi there,')}
    ${content(`lorem ipsum ${adminMessage || ''}!`)}
    ${content(
      `If you need any help getting started or have any questions, please don’t hesitate to get in touch.`,
    )}
  `;
};

module.exports = {
  rejected,
  preApproved,
  approved,
  inviteToInterView,
};
