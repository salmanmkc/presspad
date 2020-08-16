const boom = require('boom');
const {
  editBursaryById,
  upsertBursaryWindow,
  updateBursaryApplication,
} = require('../../database/queries/bursary');
const {
  findProfile,
  updateUserProfile,
} = require('../../database/queries/profiles');
const { getUserByBursaryId } = require('../../database/queries/user');
const approveBursaryApplication = require('./approveBursaryApplication');

const { internCompleteProfile } = require('../../../client/src/validation');
const { bursaryApplicationStatuses } = require('../../database/constants');
const pubSub = require('../../pubSub');

module.exports.editBursary = async (req, res, next) => {
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

module.exports.upsertBursaryWindows = async (req, res, next) => {
  try {
    const { bursaryWindows } = req.body;

    const promiseArr = bursaryWindows.map(bursaryWindow =>
      upsertBursaryWindow(bursaryWindow),
    );

    const updatedBursaryWindows = await Promise.all(promiseArr);

    return res.json(updatedBursaryWindows);
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};

module.exports.updateBursaryApplication = async (req, res, next) => {
  try {
    const { status, invite, bursaryPoints, adminMessage } = req.body;

    const { id } = req.params;
    const { type } = req.query;
    let updateData;

    const { approved, preApproved, rejected } = bursaryApplicationStatuses;

    switch (status) {
      case preApproved:
        updateData = {
          status: preApproved,
          adminMessage,
          invitedToInterview: invite,
        };

        if (invite) {
          // send invitation email
          pubSub.emit(pubSub.events.bursary.INVITE_TO_INTERVIEW, {
            adminMessage,
            applicationId: id,
          });
        }
        // send confirmation email wait for next window
        pubSub.emit(pubSub.events.bursary.PRE_APPROVED, {
          adminMessage,
          applicationId: id,
        });
        break;

      case rejected:
        updateData = { status: rejected, adminMessage };
        // send rejecting email
        pubSub.emit(pubSub.events.bursary.REJECTED, {
          adminMessage,
          applicationId: id,
        });
        break;

      case approved:
        return approveBursaryApplication(req, res, next);

      default:
        if (type === 'update-points') {
          updateData = { bursaryPoints };
        } else if (type === 'invite-to-interview') {
          updateData = { invitedToInterview: true };

          // send invitation email
          pubSub.emit(pubSub.events.bursary.INVITE_TO_INTERVIEW, {
            applicationId: id,
          });
        } else {
          return next(boom.badData());
        }
    }

    const updatedBursaryApplication = await updateBursaryApplication({
      id,
      updateData,
    });

    if (!updatedBursaryApplication) {
      return next(boom.notFound());
    }

    return res.json(updatedBursaryApplication);
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};
