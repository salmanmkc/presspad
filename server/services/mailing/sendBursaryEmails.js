const sendMail = require('./templates');
const {
  getUserByBursaryApplicationId,
} = require('../../database/queries/user');

const rejected = async ({ adminMessage, applicationId }) => {
  const [{ intern }] = await getUserByBursaryApplicationId(applicationId);

  await sendMail({
    type: 'BURSARY_REJECTED',
    userType: 'intern',
    params: { adminMessage, to: intern.email },
  });
};

const preApproved = async ({ adminMessage, applicationId }) => {
  const [{ intern }] = await getUserByBursaryApplicationId(applicationId);

  await sendMail({
    type: 'BURSARY_PRE_APPROVED',
    userType: 'intern',
    params: { adminMessage, to: intern.email },
  });
};

const approved = async ({ adminMessage, applicationId }) => {
  const [{ intern }] = await getUserByBursaryApplicationId(applicationId);

  await sendMail({
    type: 'BURSARY_APPROVED',
    userType: 'intern',
    params: { adminMessage, to: intern.email },
  });
};

const inviteToInterview = async ({ adminMessage, applicationId }) => {
  const [{ intern }] = await getUserByBursaryApplicationId(applicationId);

  await sendMail({
    type: 'BURSARY_INVITE_TO_INTERVIEW',
    userType: 'intern',
    params: { adminMessage, to: intern.email },
  });
};

module.exports = {
  rejected,
  preApproved,
  approved,
  inviteToInterview,
};
