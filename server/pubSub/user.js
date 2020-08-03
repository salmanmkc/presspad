const pubSub = require('./createPubSub');
const events = require('./eventTypes');
const mails = require('../services/mailing');

// user listeners
pubSub.listen(events.user.INTERN_SIGNUP, mails.sendWelcomeEmail);
pubSub.listen(events.user.HOST_SIGNUP, mails.sendWelcomeEmail);
pubSub.listen(events.user.RESET_PASSWORD, mails.resetPassword);
