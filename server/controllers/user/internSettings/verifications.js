const boom = require('boom');

const { updateUserProfile } = require('../../../database/queries/profiles');
const { deleteFile } = require('../../../helpers/storage');
const { storageBucket: bucketName } = require('../../../config');

module.exports = async (req, res, next) => {
  const { user } = req;
  const {
    organisation,
    internshipContact,
    internshipStartDate,
    internshipEndDate,
    internshipOfficeAddress,
    reference1,
    reference2,
    photoID,
    DBSCheck,
    refNum,
    prevPhotoIDToDelete,
    prevDBSCheckToDelete,
  } = req.body;

  try {
    const profileData = {
      organisation,
      internshipContact,
      internshipStartDate,
      internshipEndDate,
      internshipOfficeAddress,
      reference1,
      reference2,
      photoID,
      DBSCheck: { ...DBSCheck, refNum },
    };

    await updateUserProfile(user._id, profileData);
    if (prevPhotoIDToDelete) {
      deleteFile(bucketName, prevPhotoIDToDelete);
    }

    if (prevDBSCheckToDelete) {
      deleteFile(bucketName, prevDBSCheckToDelete);
    }

    res.json();
  } catch (error) {
    next(boom.badImplementation(error));
  }
};
