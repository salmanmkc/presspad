const boom = require('boom');
const updateOrgDetails = require('../../database/queries/organisation/updateOrgDetails');

module.exports = async (req, res, next) => {
  const data = req.body;
  const { id: orgId } = req.params;

  try {
    const updatedData = await updateOrgDetails({ id: orgId, updateData: data });

    if (!updatedData) {
      return next(boom.notFound());
    }

    res.json(updatedData);
  } catch (error) {
    next(boom.badImplementation(error));
  }
};
