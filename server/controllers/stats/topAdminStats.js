const boom = require('boom');

const {
  getTopAdminStats,
} = require('../../database/queries/stats/getTopAdminStats');

module.exports = async (req, res, next) => {
  const { user } = req;

  if (user.role !== 'admin')
    return next(boom.unauthorized('You do not have sufficient priveleges'));

  try {
    const stats = await getTopAdminStats();
    res.json(stats);
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};
