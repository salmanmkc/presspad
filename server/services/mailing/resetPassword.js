const sendMail = require('./templates');

module.exports = async ({ user, token }) => {
  await sendMail({
    type: 'RESET_PASSWORD',
    userType: 'all',
    params: { to: user.email, token, name: user.name },
  });
};
