const boom = require('boom');
const { internCompleteProfile } = require('../../../../client/src/validation');
const {
  updateUserProfile,
  findProfile,
} = require('../../../database/queries/profiles');

const { getBursaryByUserId } = require('../../../database/queries/bursary');

const { deleteFile } = require('../../../helpers/storage');
const { isObjectChanged } = require('../../../helpers/general');
const { storageBucket: bucketName } = require('../../../config');
const createBursaryApp = require('../../bursary/createBursaryApp.utils');

const {
  getApprovedBursaryApplication,
} = require('../../../database/queries/bursary');

module.exports = async (req, res, next) => {
  try {
    const { user } = req;
    let completed = false;
    let DBSCheckUpdated = false;
    const {
      verified: prevVerified,
      DBSCheck: { fileName: prevFileName, refNum: prevRefNum } = {
        fileName: '',
        refNum: '',
      },
      ...prevProfile
    } = await findProfile(user._id).lean();

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
      hasNoInternship,
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
      hasNoInternship,
      DBSCheck: { ...DBSCheck, refNum },
      refNum: DBSCheck.refNum,
    };

    const [approvedBursary] = await getApprovedBursaryApplication(user._id);

    if (approvedBursary) {
      const newObj = {
        internshipContact,
        internshipStartDate,
        internshipEndDate,
        internshipOfficeAddress,
        organisation,
        offerLetter,
      };
      const oldObj = {
        internshipContact: prevProfile.internshipContact,
        internshipStartDate: prevProfile.internshipStartDate,
        internshipEndDate: prevProfile.internshipEndDate,
        internshipOfficeAddress: prevProfile.internshipOfficeAddress,
        organisation: prevProfile.organisation,
        offerLetter: prevProfile.offerLetter,
      };
      const hasChanged = isObjectChanged(newObj, oldObj);

      if (hasChanged) {
        return next(boom.badRequest(`Can't change internship details`));
      }
    }

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
    } else if (completed) {
      if (prevVerified) {
        // do nothing
      } else {
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
