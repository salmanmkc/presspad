const sendMail = require('./templates');

module.exports = async ({ user }) => {
  if (user.role === 'host') {
    await sendMail({
      type: 'PROFILE_APPROVED',
      userType: 'host',
      params: { to: user.email },
    });
  }
  if (user.role === 'intern') {
    await sendMail({
      type: 'PROFILE_APPROVED',
      userType: 'intern',
      params: { to: user.email },
    });
  }
};
