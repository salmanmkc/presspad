const boom = require('boom');

const { updateUserProfile } = require('../../../database/queries/profiles');
const { getBursaryByUserId } = require('../../../database/queries/bursary');
const { internCompleteProfile } = require('../../../../client/src/validation');
const createBursaryApp = require('../../bursary/createBursaryApp.utils');

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
    belongToClass,
  } = req.body;

  try {
    const profileData = {
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
      belongToClass,
    };

    const updatedProfile = await updateUserProfile(user._id, profileData);

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
