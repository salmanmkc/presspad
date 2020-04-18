const pubSub = require('./index');
const events = require('./eventTypes');
const profile = require('./../services/profile');

pubSub.listen(events.PROFILE_CREATED, profile.updateIncompletedProfilesStatus);
pubSub.listen(events.PROFILE_UPDATED, profile.updateIncompletedProfilesStatus);
