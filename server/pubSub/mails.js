const pubSub = require('./index');
const events = require('./eventTypes');
const mails = require('./../services/mailing');

// user listeners
pubSub.listen(events.INTERN_SIGNUP, mails.sendWelcomeEmail);
pubSub.listen(events.HOST_SIGNUP, mails.sendWelcomeEmail);
