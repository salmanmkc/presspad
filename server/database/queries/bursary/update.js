const { BursaryWindow, BursaryApplication } = require('../../models');
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

const updateBursaryApplication = ({ id, updateData, session }) => {
  return BursaryApplication.findOneAndUpdate({ _id: id }, updateData, {
    new: true,
    session,
  });
};

module.exports = {
  upsertBursaryWindow,
  updateBursaryApplication,
};
