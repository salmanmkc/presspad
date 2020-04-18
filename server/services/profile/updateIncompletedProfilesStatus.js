const { getProfile } = require('../../database/queries/profile/getProfile');
const { updateProfile } = require('../../database/queries/profiles');
const { getUserById } = require('./../../database/queries/user');
const {
  getListingByUserId,
} = require('../../database/queries/listing/getListing');

const internCompleteProfileSchema = require('../../middlewares/validation/internCompleteProfileSchema');
const hostProfileSchema = require('../../middlewares/validation/hostProfileSchema');

const { validate } = require('../../middlewares/validation/index');

const updateIncompletedProfilesStatus = async profileId => {
  let isCompleted = false;
  let schema = internCompleteProfileSchema;
  let data = {};

  const profile = await getProfile(profileId);
  data = profile;

  const user = await getUserById(profile.user);

  if (user.role === 'organisation') return;
  if (user.role === 'host') {
    const listing = await getListingByUserId(user._id);
    schema = hostProfileSchema;
    data = { ...data, listing };
  }

  try {
    await validate(schema, data);
    isCompleted = true;
  } catch (error) {
    isCompleted = false;
  }

  if (profile.isCompleted !== isCompleted) {
    await updateProfile(profileId, { isCompleted });
  }
};

module.exports = updateIncompletedProfilesStatus;
