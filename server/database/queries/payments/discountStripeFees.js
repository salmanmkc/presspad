const mongoose = require('mongoose');

const { Account, User } = require('../../models');

const discountStripeFees = async (fee, type) => {
  let bulkWriteArr;
  const { account: pressPadAccountId } = await User.findOne({
    role: 'admin',
  });

  if (type === 'installment') {
    // update presspad account
    bulkWriteArr = [
      {
        updateOne: {
          filter: { _id: mongoose.Types.ObjectId(pressPadAccountId) },
          update: {
            $inc: { hostingIncome: -1 * fee },
          },
        },
      },
    ];
  }

  return Account.bulkWrite(bulkWriteArr);
};

module.exports = discountStripeFees;
