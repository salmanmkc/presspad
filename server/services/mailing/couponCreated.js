const sendMail = require('./templates');

module.exports = async ({ email, name, organisation, couponDetails }) => {
  await sendMail({
    type: 'COUPON_CREATED',
    userType: 'organisation',
    params: { to: email, name, organisation, couponDetails },
  });
};
