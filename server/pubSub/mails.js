const pubSub = require('..');
const events = require('./eventTypes');
const mails = require('./../services/mailing');

// user listeners
pubSub.listen(events.USER_SIGNUP, mails.sendWelcomeEmail);
