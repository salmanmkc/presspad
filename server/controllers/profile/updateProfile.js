const boom = require('boom');

const { newUpdateUserProfile } = require('./../../database/queries/profiles');

const updateProfile = async (req, res, next) => {
  const { fieldsToUpdate, userId } = req.body;

  try {
    await newUpdateUserProfile(userId, fieldsToUpdate);

    res.json({ success: true });
  } catch (error) {
    next(boom.badImplementation(error));
  }
};

module.exports = { updateProfile };
