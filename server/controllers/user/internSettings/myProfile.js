const boom = require('boom');

const { updateUserProfile } = require('../../../database/queries/profiles');
const { deleteFile } = require('../../../helpers/storage');
const { storageBucket: bucketName } = require('../../../config');
const { getBursaryByUserId } = require('../../../database/queries/bursary');
const { internCompleteProfile } = require('../../../../client/src/validation');
const createBursaryApp = require('../../bursary/createBursaryApp.utils');

module.exports = async (req, res, next) => {
  let completed;

  const { user } = req;
  const {
    profileImage,
    interests,
    bio,
    useReasonAnswer,
    storyAnswer,
    mentorDescribeAnswer,
    issueAnswer,
    prevImageFileNameToDelete,
  } = req.body;

  try {
    const profileData = {
      interests,
      bio,
      useReasonAnswer,
      storyAnswer,
      mentorDescribeAnswer,
      issueAnswer,
      profileImage,
    };

    const updatedProfile = await updateUserProfile(user._id, profileData);

    const bursary = await getBursaryByUserId(user._id);

    try {
      await internCompleteProfile.validate({ ...bursary, ...updatedProfile });
      completed = true;
    } catch (error) {
      completed = false;
    }

    if (completed) {
      await createBursaryApp(user._id);
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

    if (prevImageFileNameToDelete) {
      await deleteFile(bucketName, prevImageFileNameToDelete);
    }

    res.json();
  } catch (error) {
    next(boom.badImplementation(error));
  }
};
