const boom = require('boom');
const crypto = require('crypto');
const { findByEmail, updateUserById } = require('../../database/queries/user');
const { resetTokenMaxAge } = require('../../constants');
const pubSub = require('../../pubSub');

module.exports = async (req, res, next) => {
  const { email } = req.body;

  try {
    const buffer = crypto.randomBytes(32);
    const token = buffer.toString('hex');

    const user = await findByEmail(email);

    if (!user) {
      return next(boom.notFound('No account with that email found.'));
    }

    const updateData = {
      resetToken: {
        value: token,
        expiresIn: Date.now() + resetTokenMaxAge,
      },
    };
    await updateUserById(user._id, updateData);

    pubSub.emit(pubSub.events.user.RESET_PASSWORD, { user, token });

    res.clearCookie('token').json();
  } catch (error) {
    next(boom.badImplementation(error));
  }
};
