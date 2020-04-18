const sendMail = require('./templates');

module.exports = async ({ user }) => {
  if (user.role === 'host') {
    await sendMail({
      type: 'WELCOME',
      userType: 'host',
      params: { to: user.email },
    });
  }
};
