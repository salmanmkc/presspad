const boom = require('boom');
const { internCompleteProfile } = require('../../../client/src/validation');
const {
  getProfileByUserId,
} = require('../../database/queries/profile/getProfile');
const { getBursaryByUserId } = require('../../database/queries/bursary');

const {
  internDashboard: internDashboardQuery,
} = require('../../database/queries/dashboard');

const { getUpcomingBooking } = require('../../database/queries/bookings');

const internDashboard = async (req, res, next) => {
  let profileCompleted;
  const { _id: internId, role } = req.user;

  if (role !== 'intern') {
    return next(boom.forbidden());
  }
  try {
    const [
      [dashboardData],
      [nextBooking],
      profile,
      bursary,
    ] = await Promise.all([
      internDashboardQuery(internId),
      // get the next booking
      getUpcomingBooking({ userId: internId, role }),
      getProfileByUserId(internId).lean(),
      getBursaryByUserId(internId).lean(),
    ]);

    try {
      await internCompleteProfile.validate({ ...profile, ...bursary });
      profileCompleted = true;
    } catch (error) {
      profileCompleted = false;
    }
    return res.json({
      ...dashboardData,
      nextBooking,
      profileCompleted,
    });
  } catch (err) {
    return next(boom.badImplementation(err));
  }
};

module.exports = internDashboard;
