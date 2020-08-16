const mongoose = require('mongoose');

const { Account, User } = require('../../models');

const { updateBursaryApplication } = require('../bursary');

const approveBursaryApplication = async ({
  id,
  status,
  discountRate,
  maxLimit,
  totalPotentialAmount,
  adminMessage,
  londonWeighting,
}) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const { account: pressPadAccountId } = await User.findOne({
      role: 'admin',
    });

    await Account.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(pressPadAccountId),
      },
      {
        $inc: {
          bursaryFunds: -1 * totalPotentialAmount,
        },
      },
      {
        session,
        new: true,
        useFindAndModify: false,
      },
    );

    const updateData = {
      status,
      discountRate,
      totalPotentialAmount,
      maxLimit,
      adminMessage,
      londonWeighting,
    };

    const updatedBursaryApplication = await updateBursaryApplication({
      id,
      updateData,
      session,
    });

    await session.commitTransaction();
    session.endSession();

    return updatedBursaryApplication;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

module.exports = approveBursaryApplication;
