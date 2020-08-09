const boom = require('boom');
const {
  getBursaryWindows,
  getBursaryApplications,
} = require('../../database/queries/bursary');

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

module.exports.getBursaryApplications = async (req, res, next) => {
  try {
    const bursaries = await getBursaryApplications();
    if (!bursaries[0]) {
      return next(boom.notFound());
    }

    const applications = bursaries.reduce((acc, curr) => {
      acc[curr._id] = curr.data;
      return acc;
    }, {});

    return res.json(applications);
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};
