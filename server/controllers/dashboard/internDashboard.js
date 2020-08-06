const boom = require('boom');

const {
  internDashboard: internDashboardQuery,
} = require('../../database/queries/dashboard');

const { getUpcomingBooking } = require('../../database/queries/bookings');

const internDashboard = async (req, res, next) => {
  const { _id: internId, role } = req.user;

  if (role !== 'intern') {
    return next(boom.forbidden());
  }
  try {
    const [[dashboardData], [nextBooking]] = await Promise.all([
      internDashboardQuery(internId),
      // get the next booking
      getUpcomingBooking({ userId: internId, role }),
    ]);

    return res.json({ ...dashboardData, nextBooking });
  } catch (err) {
    return next(boom.badImplementation(err));
  }
};

module.exports = internDashboard;
