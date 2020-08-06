const boom = require('boom');

const { updateUserProfile } = require('../../../database/queries/profiles');
const { deleteFile } = require('../../../helpers/storage');
const { storageBucket: bucketName } = require('../../../config');

module.exports = async (req, res, next) => {
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

    await updateUserProfile(user._id, profileData);
    if (prevImageFileNameToDelete) {
      await deleteFile(bucketName, prevImageFileNameToDelete);
    }

    res.json();
  } catch (error) {
    next(boom.badImplementation(error));
  }
};
