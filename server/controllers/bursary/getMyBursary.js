const boom = require('boom');
const { getBursaryByUserId } = require('../../database/queries/bursary');

module.exports = async (req, res, next) => {
  const { _id } = req.user;

  try {
    const profile = await getBursaryByUserId(_id);

    return res.json(profile);
  } catch (err) {
    next(boom.badImplementation(err));
  }
};
