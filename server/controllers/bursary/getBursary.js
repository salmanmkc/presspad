const boom = require('boom');
const {
  getBursaryByUserId,
  getBursaryWindows,
  getBursaryApplications,
  getBursaryApplicationInfo,
  getBursaryApplicationsForCSV,
  getPendingBursaryApplicationsByUserId,
} = require('../../database/queries/bursary');

const { findProfile } = require('../../database/queries/profiles');

module.exports.getMyBursary = async (req, res, next) => {
  const { _id } = req.user;
  const { profile: isProfileDataBeenProvided } = req.query;

  try {
    const bursary = await getBursaryByUserId(_id).lean();
    let profile;

    if (isProfileDataBeenProvided) {
      profile = await findProfile(bursary.intern).lean();
    }
    return res.json({ ...profile, ...bursary });
  } catch (err) {
    next(boom.badImplementation(err));
  }
};

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
    if (type === 'all') {
      const bursaries = await getBursaryApplicationsForCSV();
      return res.json(bursaries);
    }

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

module.exports.getMyBursaryApplicationStatus = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const bursaryApplicationInfo = await getPendingBursaryApplicationsByUserId(
      _id,
    );

    return res.json(bursaryApplicationInfo);
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};
