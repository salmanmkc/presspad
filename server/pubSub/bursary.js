const pubSub = require('./createPubSub');
const events = require('./eventTypes');
const sendEmail = require('../services/mailing');

pubSub.listen(events.bursary.REJECTED, sendEmail.sendBursaryEmails.rejected);

pubSub.listen(
  events.bursary.PRE_APPROVED,
  sendEmail.sendBursaryEmails.preApproved,
);

pubSub.listen(events.bursary.APPROVED, sendEmail.sendBursaryEmails.approved);

pubSub.listen(
  events.bursary.INVITE_TO_INTERVIEW,
  sendEmail.sendBursaryEmails.inviteToInterview,
);
