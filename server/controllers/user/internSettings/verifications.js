const boom = require('boom');
const moment = require('moment');
const { internSettings } = require('../../../../client/src/validation');
const {
  updateUserProfile,
  findProfile,
} = require('../../../database/queries/profiles');
const { deleteFile } = require('../../../helpers/storage');
const { storageBucket: bucketName } = require('../../../config');

module.exports = async (req, res, next) => {
  try {
    const { user } = req;
    let fullData = false;
    const {
      verified: prevVerified,
      DBSCheck: { fileName: prevFileName, refNum: prevRefNum } = {
        fileName: '',
        refNum: '',
      },
    } = await findProfile(user._id);

    const {
      organisation,
      internshipContact,
      internshipStartDate,
      internshipEndDate,
      internshipOfficeAddress,
      reference1,
      reference2,
      photoID,
      DBSCheck = {},
      refNum,
      prevPhotoIDToDelete,
      prevDBSCheckToDelete,
    } = req.body;

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
      refNum: DBSCheck.refNum,
    };

    if (
      (DBSCheck && DBSCheck.fileName !== prevFileName) ||
      prevRefNum !== refNum
    ) {
      if (prevVerified) {
        profileData.awaitingReview = true;
        profileData.verified = false;
      } else {
        try {
          await internSettings.verificationsAllRequired.validate(profileData);
          fullData = true;
        } catch (error) {
          console.log('REF', error);
          fullData = false;
        }
      }

      profileData.awaitingReview = fullData;
      if (fullData) {
        profileData.awaitingReviewDate = moment();
      }
    }

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
