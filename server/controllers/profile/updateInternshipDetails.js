const boom = require('boom');
const mongoose = require('mongoose');

// QUERIES
const {
  updateUserProfile,
  findProfile,
} = require('../../database/queries/profiles');
const {
  getApprovedBursaryApplication,
} = require('../../database/queries/bursary');
const { getBursaryByUserId } = require('../../database/queries/bursary');
const { internCompleteProfile } = require('../../../client/src/validation');
const createBursaryApp = require('../bursary/createBursaryApp.utils');

const { checkInternshipDates } = require('../../helpers/general');

const updateInternshipDetails = async (req, res, next) => {
  try {
    const { _id: userId, role } = req.user;
    const {
      // internship data
      organisation,
      internshipContact,
      internshipOfficeAddress,
      internshipStartDate,
      internshipEndDate,
      offerLetter,
      // booking data
      startDate,
      endDate,
    } = req.body;
    let completed = false;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return next(boom.notFound());
    }

    if (role !== 'intern') {
      return next(boom.forbidden());
    }

    const [approvedBursary] = await getApprovedBursaryApplication(userId);

    if (approvedBursary) {
      return next(boom.badRequest());
    }

    const { verified: prevVerified } = await findProfile(userId).lean();

    // check if internship dates are valid for booking request
    const validInternshipDates = await checkInternshipDates({
      internshipStartDate,
      internshipEndDate,
      startDate,
      endDate,
    });

    if (!validInternshipDates) {
      return next(
        boom.badRequest(
          'To make a booking your internship cannot start / end more than 3 days before / after the booking. Please make sure you select the exact days.',
        ),
      );
    }

    const updatedProfile = await updateUserProfile(userId, {
      organisation,
      internshipContact,
      internshipOfficeAddress,
      internshipStartDate,
      internshipEndDate,
      offerLetter,
    }).lean();

    const bursary = await getBursaryByUserId(userId);

    try {
      await internCompleteProfile.validate({ ...bursary, ...updatedProfile });
      completed = true;
    } catch (error) {
      completed = false;
    }

    if (completed && !updatedProfile.hasNoInternship) {
      await createBursaryApp(userId);
    }

    if (!completed) {
      await updateUserProfile(userId, {
        awaitingReview: false,
        verified: false,
      });
    } else if (completed) {
      if (prevVerified) {
        // do nothing
      } else {
        await updateUserProfile(userId, {
          awaitingReview: true,
          awaitingReviewDate: Date.now(),
          verified: false,
        });
      }
    }

    return res.json({});
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};

module.exports = updateInternshipDetails;
