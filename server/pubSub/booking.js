const pubSub = require('./createPubSub');
const events = require('./eventTypes');
const sendEmail = require('../services/mailing');

pubSub.listen(events.booking.REJECTED, sendEmail.sendRejectionEmails);
pubSub.listen(events.booking.REQUESTED /** email goes to admin here */);
pubSub.listen(events.booking.ACCEPTED_BY_ADMIN, sendEmail.sendNewBookingEmails);
pubSub.listen(
  events.booking.ACCEPTED_BY_HOST,
  sendEmail.sendAcceptedBookingEmails,
);
