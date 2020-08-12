const boom = require('boom');
const {
  getBursaryWindows,
  getBursaryApplications,
  getBursaryApplicationInfo,
} = require('../../database/queries/bursary');

module.exports.getBursaryWindows = async (req, res, next) => {
  try {
    const bursaries = await getBursaryWindows();

    return res.json(bursaries);
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};

module.exports.getBursaryApplications = async (req, res, next) => {
  try {
    const { type } = req.query;

    const bursaries = await getBursaryApplications(type);

    return res.json(bursaries);
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};

module.exports.getBursaryApplicationInfo = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [bursaryApplicationInfo] = await getBursaryApplicationInfo(id);

    if (!bursaryApplicationInfo) {
      return next(boom.notFound());
    }

    return res.json(bursaryApplicationInfo);
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};
