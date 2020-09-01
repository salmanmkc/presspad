const boom = require('boom');
const mongoose = require('mongoose');

// QUERIES
const { updateUserProfile } = require('../../database/queries/profiles');
const {
  getApprovedBursaryApplication,
} = require('../../database/queries/bursary');

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

    await updateUserProfile(userId, {
      organisation,
      internshipContact,
      internshipOfficeAddress,
      internshipStartDate,
      internshipEndDate,
      offerLetter,
    });

    return res.json({});
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};

module.exports = updateInternshipDetails;
