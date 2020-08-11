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
    const { bursaryPoints, adminMessage, invite, status } = req.body;
    const { id } = req.params;
    const { type } = req.query;
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
        updateData = {
          status: preApproved,
          adminMessage,
          invitedToInterview: invite,
        };

        if (invite) {
          // send invitation email
          console.log('invite');
        } else {
          // send confirmation email wait for next window
        }
        break;
      case rejected:
        updateData = { status: rejected, adminMessage };

        // send rejecting email
        break;
      case approved:
        break;

      default:
        if (type === 'update-points') {
          updateData = { bursaryPoints };
        } else {
          return next(boom.badData());
        }
    }

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
