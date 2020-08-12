const boom = require('boom');
const {
  upsertBursaryWindow,
  updateBursaryApplication,
} = require('../../database/queries/bursary');
const { bursaryApplicationStatuses } = require('../../database/constants');
const approveBursaryApplication = require('./approveBursaryApplication');
const pubSub = require('../../pubSub');

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
    const { status, invite, bursaryPoints, adminMessage } = req.body;

    const { id } = req.params;
    const { type } = req.query;
    let updateData;

    const { approved, preApproved, rejected } = bursaryApplicationStatuses;

    switch (status) {
      case preApproved:
        updateData = {
          status: preApproved,
          adminMessage,
          invitedToInterview: invite,
        };

        if (invite) {
          // send invitation email
          pubSub.emit(pubSub.events.bursary.INVITE_TO_INTERVIEW, {
            adminMessage,
            applicationId: id,
          });
        }
        // send confirmation email wait for next window
        pubSub.emit(pubSub.events.bursary.PRE_APPROVED, {
          adminMessage,
          applicationId: id,
        });
        break;

      case rejected:
        updateData = { status: rejected, adminMessage };
        // send rejecting email
        pubSub.emit(pubSub.events.bursary.REJECTED, {
          adminMessage,
          applicationId: id,
        });
        break;

      case approved:
        return approveBursaryApplication(req, res, next);

      default:
        if (type === 'update-points') {
          updateData = { bursaryPoints };
        } else if (type === 'invite-to-interview') {
          updateData = { invitedToInterview: true };

          // send invitation email
          pubSub.emit(pubSub.events.bursary.INVITE_TO_INTERVIEW, {
            applicationId: id,
          });
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
