const boom = require('boom');

const {
  orgDashboard: orgDashboardQuery,
} = require('../../database/queries/dashboard');

module.exports = async (req, res, next) => {
  const { user } = req;
  const { role, organisation } = user;

  // check for user role
  if (role !== 'organisation' || !organisation) {
    return next(boom.unauthorized());
  }

  try {
    const results = await orgDashboardQuery(organisation);

    // console.log(results);

    return res.json(results);
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};
