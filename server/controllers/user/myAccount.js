const boom = require('boom');
const { compare } = require('bcryptjs');
const { hash } = require('bcryptjs');

const { updateUserById, getUserById } = require('../../database/queries/user');

module.exports = async (req, res, next) => {
  const { name, email, oldPassword, newPassword } = req.body;
  const { _id } = req.user;
  const data = { name, email };

  try {
    if (newPassword && oldPassword) {
      const user = await getUserById(_id, false);

      const matched = await compare(oldPassword, user.password);
      if (matched) {
        const hashedPassword = await hash(newPassword, 8);
        data.password = hashedPassword;
      } else {
        return next(boom.badData("Password doesn't match"));
      }
    }
    await updateUserById(_id, data);
    res.json();
  } catch (error) {
    next(boom.badImplementation(error));
  }
};
