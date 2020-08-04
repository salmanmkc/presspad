const boom = require('boom');
const { hash } = require('bcryptjs');

const {
  findUserByToken,
  updateUserById,
} = require('../../database/queries/user');

module.exports = async (req, res, next) => {
  const { token, password } = req.body;

  try {
    // check if the token is valid
    const user = await findUserByToken(token);

    if (!user) {
      return next(
        boom.unauthorized(
          'Your token is invalid or has expired, reset the password again please',
        ),
      );
    }

    const hashedPassword = await hash(password, 8);

    // update the user's new password and delete the token
    const updateData = {
      password: hashedPassword,
      resetToken: {
        value: undefined,
        expiresIn: undefined,
      },
    };

    await updateUserById(user.id, updateData);
    res.json();
  } catch (error) {
    next(boom.badImplementation());
  }
};
