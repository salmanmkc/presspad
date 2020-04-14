const boom = require('boom');
const mongoose = require('mongoose');

const { updateUserProfile } = require('./../../database/queries/profiles');

const updateProfile = async (req, res, next) => {
  const { fieldsToUpdate, userId } = req.body;

  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const updatedProfile = await updateUserProfile(
        userId,
        fieldsToUpdate,
        session,
      );
      console.log('update', updatedProfile);
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      throw err;
    }
    res.json({ success: true });
  } catch (error) {
    next(boom.badImplementation(error));
  }
};

module.exports = { updateProfile };
