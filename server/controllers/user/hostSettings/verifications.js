const boom = require('boom');
const { hostCompleteProfile } = require('../../../../client/src/validation');
const {
  updateUserProfile,
  findProfile,
} = require('../../../database/queries/profiles');

const {
  getListingByUserId,
} = require('../../../database/queries/listing/getListing');

const { deleteFile } = require('../../../helpers/storage');
const { storageBucket: bucketName } = require('../../../config');

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
      jobTitle,
      workingArea,
      workingAreaOther,
      organisation,
      reference1,
      reference2,
      photoID,
      pressCard,
      DBSCheck = {},
      houseViewingDate,
      prevPhotoIDToDelete,
      prevDBSCheckToDelete,
      pressCardToDelete,
      refNum,
    } = req.body;

    const profileData = {
      jobTitle,
      workingArea,
      workingAreaOther,
      organisation,
      reference1,
      reference2,
      photoID,
      pressCard,
      DBSCheck: { ...DBSCheck, refNum },
      houseViewingDate,
    };

    const updatedProfile = await updateUserProfile(
      user._id,
      profileData,
    ).lean();
    const listing = await getListingByUserId(user._id);

    try {
      await hostCompleteProfile.validate({ ...listing, ...updatedProfile });
      completed = true;
    } catch (error) {
      completed = false;
    }

    if (
      (DBSCheck && DBSCheck.fileName !== prevFileName) ||
      (DBSCheck && prevRefNum !== DBSCheck.refNum)
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

    if (pressCardToDelete) {
      deleteFile(bucketName, pressCardToDelete);
    }

    res.json();
  } catch (error) {
    next(boom.badImplementation(error));
  }
};
