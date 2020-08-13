const boom = require('boom');
const { editBursaryById } = require('../../database/queries/bursary');
const { findProfile } = require('../../database/queries/profiles');
const { internCompleteProfile } = require('../../../client/src/validation');
const { updateUserProfile } = require('../../database/queries/profiles');
const { getUserByBursaryId } = require('../../database/queries/user');

module.exports = async (req, res, next) => {
  let completed;

  const { id } = req.params;
  const data = req.body;

  try {
    const bursary = await editBursaryById(id, data);
    const user = await getUserByBursaryId(id);
    const profile = await findProfile(user._id);

    try {
      await internCompleteProfile.validate({ ...bursary, ...profile });
      completed = true;
    } catch (error) {
      completed = false;
    }

    if (!completed) {
      await updateUserProfile(user._id, {
        awaitingReview: false,
        verified: false,
      });
    } else if (updateUserProfile.verified) {
      // do nothing
    } else if (updateUserProfile.awaitingReview) {
      await updateUserProfile(user._id, {
        awaitingReview: true,
        awaitingReviewDate: Date.now(),
        verified: false,
      });
    }

    return res.json(bursary);
  } catch (err) {
    next(boom.badImplementation(err));
  }
};
