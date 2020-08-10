const boom = require('boom');

const { updateUserProfile } = require('../../../database/queries/profiles');

module.exports = async (req, res, next) => {
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
    // Object.entries(req.body).forEach(([key, value]) => {
    //   if (value) {
    //     profileData[key] = value;
    //   }
    // });

    await updateUserProfile(user._id, profileData);

    res.json();
  } catch (error) {
    next(boom.badImplementation(error));
  }
};
