const sendMail = require('./templates');
const { adminEmails } = require('./../../config');

module.exports = async ({ reason }) => {
  await sendMail({
    type: 'DELETE_ACCOUNT',
    userType: 'admin',
    params: { to: adminEmails.info, reason },
  });
};
