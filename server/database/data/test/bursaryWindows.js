const { BursaryWindow } = require('../../models');

const reset = () => BursaryWindow.deleteMany();

const createAll = async () => {
  const bursaryWindows = [
    {
      startDate: Date.now() - 12 * 24 * 60 * 60 * 1000,
      endDate: Date.now() + 3 * 24 * 60 * 60 * 1000,
    },
    {
      startDate: Date.now() + 1 * 24 * 60 * 60 * 1000,
      endDate: Date.now() + 50 * 24 * 60 * 60 * 1000,
    },
  ];

  const [bursaryWindow1, bursaryWindow2] = await BursaryWindow.create(
    bursaryWindows,
  );

  return {
    bursaryWindow1,
    bursaryWindow2,
  };
};

module.exports = {
  createAll,
  reset,
};
