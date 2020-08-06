const boom = require('boom');
const { getBursaryWindows } = require('../../database/queries/bursary');

module.exports.getBursaryWindows = async (req, res, next) => {
  try {
    const bursaries = await getBursaryWindows();
    if (!bursaries[0]) {
      return next(boom.notFound());
    }

    return res.json(bursaries);
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};
