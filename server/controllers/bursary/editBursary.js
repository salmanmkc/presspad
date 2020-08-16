const boom = require('boom');
const { editBursaryById } = require('../../database/queries/bursary');
const { findProfile } = require('../../database/queries/profiles');
const { internCompleteProfile } = require('../../../client/src/validation');
const { updateUserProfile } = require('../../database/queries/profiles');
const { getUserByBursaryId } = require('../../database/queries/user');

module.exports = async (req, res, next) => {
  let completed;

  const { id } = req.params;
  const { profile: isProfileDataBeenProvided } = req.query;
  let profile;

  const {
    // bursary data
    typeOfSchool,
    typeOfSchoolOther,
    highestLevelOfQualifications,
    highestLevelOfQualificationsOther,
    describeMainIncomeEarnerMainJob,
    numberOfPeopleKnowBefore16,
    typeOfUniversity,
    eligibleForFreeSchoolMeals,
    comingFromLowerSociolEconomicBackground,
    householdMembersSpeakOtherLanguage,
    householdMembersSpeakOtherLanguageYes,
    annualHouseholdIncome,
    statusOfHome,
    statusOfHomeOther,
    anyHouseholdReceive,
    benefitFromNepotism,
    peopleYouKnowSocially,
    accentAffectsPotentialEmployers,
    parentsSupportiveOfCareer,

    // profile data
    organisation,
    internshipContact,
    internshipStartDate,
    internshipEndDate,
    internshipOfficeAddress,
    offerLetter,
  } = req.body;

  try {
    const bursaryData = {
      typeOfSchool,
      typeOfSchoolOther,
      highestLevelOfQualifications,
      highestLevelOfQualificationsOther,
      describeMainIncomeEarnerMainJob,
      numberOfPeopleKnowBefore16,
      typeOfUniversity,
      eligibleForFreeSchoolMeals,
      comingFromLowerSociolEconomicBackground,
      householdMembersSpeakOtherLanguage,
      householdMembersSpeakOtherLanguageYes,
      annualHouseholdIncome,
      statusOfHome,
      statusOfHomeOther,
      anyHouseholdReceive,
      benefitFromNepotism,
      peopleYouKnowSocially,
      accentAffectsPotentialEmployers,
      parentsSupportiveOfCareer,
    };

    const profileData = {
      organisation,
      internshipContact,
      internshipStartDate,
      internshipEndDate,
      internshipOfficeAddress,
      offerLetter,
    };

    const bursary = await editBursaryById(id, bursaryData);
    const user = await getUserByBursaryId(id);

    console.log({ id });
    if (isProfileDataBeenProvided) {
      profile = await updateUserProfile(user._id, profileData).lean();
    } else {
      profile = await findProfile(user._id).lean();
    }

    try {
      await internCompleteProfile.validate({ ...bursary, ...profile });
      completed = true;
    } catch (error) {
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

    return res.json(bursary);
  } catch (err) {
    next(boom.badImplementation(err));
  }
};
