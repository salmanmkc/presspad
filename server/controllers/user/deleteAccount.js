const boom = require('boom');
const pubSub = require('../../pubSub');

const { deleteUser } = require('./../../database/queries/user');
const { deleteProfileByUserId } = require('./../../database/queries/profiles');

module.exports = async (req, res, next) => {
  const { reason } = req.body;
  const { _id } = req.user;

  try {
    await deleteUser({ id: _id, deleteReason: reason });
    await deleteProfileByUserId(_id);
    pubSub.emit(pubSub.events.user.DELETE_ACCOUNT, { user: req.user, reason });

    res.clearCookie('token').json();
  } catch (error) {
    next(boom.badImplementation(error));
  }
};
