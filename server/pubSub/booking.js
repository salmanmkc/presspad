const pubSub = require('./createPubSub');
const events = require('./eventTypes');
const sendEmail = require('./../services/mailing');

pubSub.listen(events.BOOKING_REJECTED, sendEmail.sendRejectionEmails);
pubSub.listen(events.BOOKING_REQUESTED /** email goes to admin here */);
pubSub.listen(events.BOOKING_ACCEPTED_BY_ADMIN, sendEmail.sendNewBookingEmails);
pubSub.listen(
  events.BOOKING_ACCEPTED_BY_HOST,
  sendEmail.sendAcceptedBookingEmails,
);
