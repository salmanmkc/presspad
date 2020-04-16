const boom = require('boom');
const mongoose = require('mongoose');

// QUERIES
const { updateUserProfile } = require('../../database/queries/profiles');

const updateInternshipDetails = async (req, res, next) => {
  try {
    const { _id: userId, role } = req.user;
    const {
      organisation,
      internshipContact,
      internshipOfficeAddress,
      internshipStartDate,
      internshipEndDate,
      offerLetter,
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return next(boom.notFound());
    }

    if (role !== 'intern') {
      return next(boom.forbidden());
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
