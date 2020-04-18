const pubSub = require('./index');
const events = require('./eventTypes');
const sendEmail = require('./../services/mailing');

pubSub.listen(events.BOOKING_REJECTED, sendEmail.sendRejectionEmails);
