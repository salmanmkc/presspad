const boom = require('boom');
const { getBursaryByUserId } = require('../../database/queries/bursary');
const { findProfile } = require('../../database/queries/profiles');

module.exports = async (req, res, next) => {
  const { _id } = req.user;
  const { profile: isProfileDataBeenProvided } = req.query;

  try {
    const bursary = await getBursaryByUserId(_id).lean();
    let profile;

    if (isProfileDataBeenProvided) {
      profile = await findProfile(bursary.intern).lean();
    }
    return res.json({ ...profile, ...bursary });
  } catch (err) {
    next(boom.badImplementation(err));
  }
};
