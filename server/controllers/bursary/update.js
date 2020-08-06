const boom = require('boom');
const { upsertBursaryWindow } = require('../../database/queries/bursary');

module.exports.upsertBursaryWindows = async (req, res, next) => {
  try {
    const { bursaryWindows } = req.body;

    const promiseArr = bursaryWindows.map(bursaryWindow =>
      upsertBursaryWindow(bursaryWindow),
    );

    const updatedBursaryWindows = await Promise.all(promiseArr);

    return res.json(updatedBursaryWindows);
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};
