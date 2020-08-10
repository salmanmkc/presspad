const boom = require('boom');
const {
  upsertBursaryWindow,
  updateBursaryApplication,
} = require('../../database/queries/bursary');
const { bursaryApplicationStatuses } = require('../../database/constants');

module.exports.upsertBursaryWindows = async (req, res, next) => {
  try {
    const { bursaryWindows } = req.body;

    const promiseArr = bursaryWindows.map(bursaryWindow =>
      upsertBursaryWindow(bursaryWindow),
    );

    const updatedBursaryWindows = await Promise.all(promiseArr);

    return res.json(updatedBursaryWindows);
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};

module.exports.updateBursaryApplication = async (req, res, next) => {
  try {
    const { points, adminMessage, inviteToInterview, status } = req.body;
    const { id } = req.params;
    let updateData;

    console.log(id);
    console.log(req.body);
    const {
      request,
      approved,
      preApproved,
      rejected,
    } = bursaryApplicationStatuses;

    switch (status) {
      case preApproved:
        // validate application status

        break;
      case rejected:
        break;
      case approved:
        break;

      default:
        return next(boom.badData());
    }
    updateData = {
      points,
      adminMessage,
      inviteToInterview,
      status,
    };

    const updatedBursaryApplication = await updateBursaryApplication({
      id,
      updateData,
    });

    if (!updatedBursaryApplication) {
      return next(boom.notFound());
    }

    return res.json(updatedBursaryApplication);
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};
