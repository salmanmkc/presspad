const { BursaryWindow, BursaryApplication, Bursary } = require('../../models');

const editBursaryById = (id, data) => Bursary.findByIdAndUpdate(id, data);

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
  editBursaryById,
  upsertBursaryWindow,
  updateBursaryApplication,
};
