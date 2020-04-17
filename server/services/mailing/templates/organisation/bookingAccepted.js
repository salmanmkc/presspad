const { greeting, content } = require('./../htmlTags');

module.exports = params => {
  return `
    ${greeting('Hi there,')}
    ${content(
      `We’re delighted to tell you that ${params.internName} has found somewhere to stay for the duration of their placement! They have spent £${params.amountSpent} of ${params.couponCode}.`,
    )}
  `;
};
