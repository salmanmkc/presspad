const boom = require('boom');
const getOrgDetails = require('../../database/queries/organisation/getOrgDetails');

module.exports = async (req, res, next) => {
  const { id: orgId } = req.params;

  try {
    const data = await getOrgDetails(orgId);

    if (!data) {
      return next(boom.notFound());
    }

    res.json(data);
  } catch (error) {
    next(boom.badImplementation(error));
  }
};
