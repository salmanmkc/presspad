const { greeting, content } = require('../htmlTags');

module.exports = params => {
  const { name, organisation, couponDetails } = params;

  return `
    ${greeting(`Hi ${name}, `)}
    ${content(`${organisation} has created a coupon for you.`)}
    ${couponDetails.message.length &&
      `Message: ${content(`${couponDetails.message}`)}`}
    ${content(
      `Enter ${couponDetails.code} and get ${couponDetails.discountRate} % off your next booking!`,
    )}
    ${content(
      `Please make sure to be using your coupon during these dates: ${couponDetails.startDate} - ${couponDetails.endDate}!`,
    )}
  `;
};
