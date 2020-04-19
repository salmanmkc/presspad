// expect boolean and profileId

const boom = require('boom');
const pubSub = require('./../../pubSub');

// QUERIES
const {
  approveRejectProfile,
} = require('./../../database/queries/profile/verifyProfile');

const {
  getUserDataByProfileId,
} = require('./../../database/queries/profile/getProfile');

module.exports = async (req, res, next) => {
  const { verify, profileId } = req.body;
  if (req.user.role !== 'admin')
    return next(boom.forbidden('Only admin can access this route'));
  try {
    await approveRejectProfile(profileId, verify);
    // if admin approved host's profile

    // get host details
    const [host] = await getUserDataByProfileId(profileId);
    pubSub.emit(pubSub.events.profile.APPROVED, { user: host });

    return res.json('success');
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};
