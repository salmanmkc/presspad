const sendMail = require('./templates');

module.exports = async ({ user }) => {
  if (user.role === 'host') {
    await sendMail({
      type: 'VIDEO_PROPERTY_CHECK',
      userType: 'host',
      params: { to: user.email },
    });
  }
};
