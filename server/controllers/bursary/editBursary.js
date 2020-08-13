const boom = require('boom');
const {
  editBursaryById,
  upsertBursaryWindow,
  updateBursaryApplication,
} = require('../../database/queries/bursary');
const {
  findProfile,
  updateUserProfile,
} = require('../../database/queries/profiles');
const { getUserByBursaryId } = require('../../database/queries/user');
const approveBursaryApplication = require('./approveBursaryApplication');

const { internCompleteProfile } = require('../../../client/src/validation');
const { bursaryApplicationStatuses } = require('../../database/constants');
const pubSub = require('../../pubSub');

module.exports.editBursary = async (req, res, next) => {
  let completed;

  const { id } = req.params;
  const data = req.body;

  try {
    const bursary = await editBursaryById(id, data);
    const user = await getUserByBursaryId(id);
    const profile = await findProfile(user._id);

    try {
      await internCompleteProfile.validate({ ...bursary, ...profile });
      completed = true;
    } catch (error) {
      completed = false;
    }

    if (!completed) {
      await updateUserProfile(user._id, {
        awaitingReview: false,
        verified: false,
      });
    } else if (updateUserProfile.verified) {
      // do nothing
    } else if (updateUserProfile.awaitingReview) {
      await updateUserProfile(user._id, {
        awaitingReview: true,
        awaitingReviewDate: Date.now(),
        verified: false,
      });
    }

    return res.json(bursary);
  } catch (err) {
    next(boom.badImplementation(err));
  }
};

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
