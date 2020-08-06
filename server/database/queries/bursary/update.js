const { BursaryWindow } = require('../../models');
// const { bursaryWindowStatuses } = require('../../constants');

const upsertBursaryWindow = bursaryWindow => {
  if (bursaryWindow._id) {
    return BursaryWindow.findOneAndUpdate(
      { _id: bursaryWindow._id },
      bursaryWindow,
      {
        new: true,
      },
    );
  }
  return BursaryWindow.create(bursaryWindow);
};

module.exports = {
  upsertBursaryWindow,
};
