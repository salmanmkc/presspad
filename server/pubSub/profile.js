const pubSub = require('./createPubSub');
const events = require('./eventTypes');
const profile = require('./../services/profile');
const sendEmail = require('./../services/mailing');

pubSub.listen(events.profile.CREATED, profile.updateIncompletedProfilesStatus);
pubSub.listen(events.profile.UPDATED, profile.updateIncompletedProfilesStatus);
pubSub.listen(events.profile.APPROVED, sendEmail.profileApproved);
pubSub.listen(events.profile.COMPLETED, sendEmail.profileCompleted);
