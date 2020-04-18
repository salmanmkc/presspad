const pubSub = require('./index');
const events = require('./eventTypes');
const profile = require('./../services/profile');
const sendEmail = require('./../services/mailing');

pubSub.listen(events.PROFILE_CREATED, profile.updateIncompletedProfilesStatus);
pubSub.listen(events.PROFILE_UPDATED, profile.updateIncompletedProfilesStatus);
pubSub.listen(events.PROFILE_APPROVED, sendEmail.profileApproved);
