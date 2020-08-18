const boom = require('boom');
const { internCompleteProfile } = require('../../../../client/src/validation');
const {
  updateUserProfile,
  findProfile,
} = require('../../../database/queries/profiles');

const { getBursaryByUserId } = require('../../../database/queries/bursary');

const { deleteFile } = require('../../../helpers/storage');
const { storageBucket: bucketName } = require('../../../config');
const createBursaryApp = require('../../bursary/createBursaryApp.utils');

module.exports = async (req, res, next) => {
  try {
    const { user } = req;
    let completed = false;
    let DBSCheckUpdated = false;
    const {
      verified: prevVerified,
      awaitingReview: prevAwaitingReview,
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
      prevOfferLetterToDelete,
      offerLetter,
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
      offerLetter,

      DBSCheck: { ...DBSCheck, refNum },
      refNum: DBSCheck.refNum,
    };

    const updatedProfile = await updateUserProfile(
      user._id,
      profileData,
    ).lean();
    const bursary = await getBursaryByUserId(user._id);

    try {
      await internCompleteProfile.validate({ ...bursary, ...updatedProfile });
      completed = true;
    } catch (error) {
      completed = false;
    }

    if (completed && !updatedProfile.hasNoInternship) {
      await createBursaryApp(user._id);
    }

    if (
      (DBSCheck && DBSCheck.fileName !== prevFileName) ||
      prevRefNum !== refNum
    ) {
      DBSCheckUpdated = true;
    }

    if (!completed) {
      await updateUserProfile(user._id, {
        awaitingReview: false,
        verified: false,
      });
    } else if (completed && DBSCheckUpdated) {
      await updateUserProfile(user._id, {
        awaitingReview: true,
        awaitingReviewDate: Date.now(),
        verified: false,
      });
    } else if (completed && !(DBSCheck && DBSCheck.fileName)) {
      if (prevVerified) {
        // do nothing
      } else if (prevAwaitingReview) {
        await updateUserProfile(user._id, {
          awaitingReview: true,
          awaitingReviewDate: Date.now(),
          verified: false,
        });
      }
    }

    if (prevPhotoIDToDelete) {
      deleteFile(bucketName, prevPhotoIDToDelete);
    }

    if (prevDBSCheckToDelete) {
      deleteFile(bucketName, prevDBSCheckToDelete);
    }

    if (prevOfferLetterToDelete) {
      deleteFile(bucketName, prevOfferLetterToDelete);
    }

    res.json();
  } catch (error) {
    next(boom.badImplementation(error));
  }
};
