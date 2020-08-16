const boom = require('boom');

const { updateUserProfile } = require('../../../database/queries/profiles');
const {
  getListingByUserId,
} = require('../../../database/queries/listing/getListing');
const { hostCompleteProfile } = require('../../../../client/src/validation');

module.exports = async (req, res, next) => {
  let completed;

  const { user } = req;

  const {
    birthDate,
    phoneNumber,
    hometown,
    lastStudySubject,
    lastStudyUniversity,
    hearAboutPressPadAnswer,
    gender,
    genderOther,
    sexualOrientation,
    ethnicity,
    ethnicityOther,
    religion,
    neurodivergent,
    neurodivergentYes,
    disability,
    disabilityYes,
    disabilityYesOther,
    childCare,
    illCare,
    degreeLevel,
    typeOfSchool,
    typeOfSchoolOther,
    eligibleForFreeSchoolMeals,
    describeMainIncomeEarnerMainJob,
    highestLevelOfQualifications,
    highestLevelOfQualificationsOther,
    parentsWorkInPress,
    belongToClass,
  } = req.body;

  try {
    const aboutMeData = {
      birthDate,
      phoneNumber,
      hometown,
      lastStudySubject,
      lastStudyUniversity,
      hearAboutPressPadAnswer,
      gender,
      genderOther,
      sexualOrientation,
      ethnicity,
      ethnicityOther,
      religion,
      neurodivergent,
      neurodivergentYes,
      disability,
      disabilityYes,
      disabilityYesOther,
      childCare,
      illCare,
      degreeLevel,
      typeOfSchool,
      typeOfSchoolOther,
      eligibleForFreeSchoolMeals,
      describeMainIncomeEarnerMainJob,
      highestLevelOfQualifications,
      highestLevelOfQualificationsOther,
      parentsWorkInPress,
      belongToClass,
    };

    const updatedProfile = await updateUserProfile(user._id, aboutMeData);

    const listing = await getListingByUserId(user._id);

    try {
      await hostCompleteProfile.validate({ ...listing, ...updatedProfile });
      completed = true;
    } catch (error) {
      console.log('er', error);
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
    res.json();
  } catch (error) {
    next(boom.badImplementation(error));
  }
};
