const boom = require('boom');
const pubSub = require('./../../pubSub');

const {
  updateUserProfile,
  findProfile,
  createNewProfile,
} = require('./../../database/queries/profiles');

module.exports = async (req, res, next) => {
  const { user } = req;
  const { profileImage, bio } = req.body;

  // check for required fields
  if (!profileImage || !bio) {
    return next(boom.badRequest('missed data'));
  }

  try {
    const profileData = {
      user: user._id,
      verified: true,
    };

    Object.entries(req.body).forEach(([key, value]) => {
      if (value) {
        profileData[key] = value;
      }
    });

    const foundProfile = await findProfile(user._id);

    // update the intern profile
    if (foundProfile) {
      const profile = await updateUserProfile(user._id, profileData);
      pubSub.emit(pubSub.events.profile.UPDATED, profile._id);
    } else {
      const profile = await createNewProfile(profileData);
      pubSub.emit(pubSub.events.profile.CREATED, profile._id);
    }

    return res.json({ success: true });
  } catch (err) {
    return next(boom.badImplementation(err));
  }
};
