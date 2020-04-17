const boom = require('boom');

// queries
const {
  getProfileByRoleAndId,
} = require('../../database/queries/profile/getProfile');

// validation
const internCompleteProfileSchema = require('../../middlewares/validation/internCompleteProfileSchema');
const { validate } = require('../../middlewares/validation/index');
const { checkInternshipDates } = require('../../helpers/general');
/**
 * get the profile data adn the listing based on the role
 * @param {string} _id user id
 * @param {string} role user role
 */

const _getProfileBasedRole = async (_id, role) => {
  const profile = await getProfileByRoleAndId(_id, role);
  return profile;
};

module.exports = async (req, res, next) => {
  const { _id, role } = req.user;
  const { startDate, endDate } = req.query;
  if (role !== 'intern') {
    return next(boom.forbidden('Only interns can book a stay'));
  }
  let isComplete = false;
  let verified;
  let validInternshipDates;

  try {
    const [profile] = await _getProfileBasedRole(_id, 'intern');
    if (!profile) {
      return next(boom.notFound('You have no profile'));
    }

    validInternshipDates = checkInternshipDates({
      internshipStartDate: profile.internshipStartDate,
      internshipEndDate: profile.internshipEndDate,
      endDate,
      startDate,
    });

    verified = profile.verified;
    await validate(internCompleteProfileSchema, profile);

    isComplete = true;
    return res.send({ isComplete, verified, validInternshipDates });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.send({ isComplete, verified, validInternshipDates });
    }
    return next(boom.badImplementation(err));
  }
};
