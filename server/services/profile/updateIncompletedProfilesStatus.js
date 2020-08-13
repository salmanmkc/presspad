const { updateProfile } = require('../../database/queries/profiles');
const { getUserById } = require('../../database/queries/user');
const {
  getListingByUserId,
} = require('../../database/queries/listing/getListing');
const pubSub = require('../../pubSub');

const hostProfileSchema = require('../../middlewares/validation/hostProfileSchema');

const { validate } = require('../../middlewares/validation/index');

const updateIncompletedProfilesStatus = async profile => {
  let isCompleted = false;
  let data = {};

  data = profile;

  const user = await getUserById(profile.user);

  if (user.role === 'organisation' || user.role === 'intern') return;

  const listing = await getListingByUserId(user._id);

  data = { ...data, ...listing };

  try {
    // TODO somehow validation throw error for hosts even if the profile data is completed
    await validate(hostProfileSchema, data);
    isCompleted = true;
  } catch (error) {
    isCompleted = false;
  }

  if (profile.isCompleted !== isCompleted) {
    await updateProfile(profile._id, { isCompleted });
    if (isCompleted) {
      pubSub.emit(pubSub.events.profile.COMPLETED, { profile, user });
    }
  }
};

module.exports = updateIncompletedProfilesStatus;
