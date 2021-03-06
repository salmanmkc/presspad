const boom = require('boom');
const {
  getProfileByUserId,
} = require('../../database/queries/profile/getProfile');
const {
  getListingByUserId,
} = require('../../database/queries/listing/getListing');

const generateUrl = require('../../helpers/generateFileURL');

/**
 * get the profile data adn the listing based on the role
 * @param {string} _id user id
 * @param {string} role user role
 * @param {object} res http response object
 */

const _getProfileBasedRole = async (_id, role, res) => {
  // use lean() or toJSON() to convert mongoose document to json
  const profile = await getProfileByUserId(_id).lean();
  // you should check the object on the frontEnd
  if (!profile) return res.json({});

  const { profileImage, photoID, offerLetter, DBSCheck, pressCard } = profile;
  await Promise.all([
    generateUrl(profileImage),
    generateUrl(photoID),
    generateUrl(offerLetter),
    generateUrl(DBSCheck),
    generateUrl(pressCard),
  ]);

  if (role === 'host' || role === 'superhost') {
    const listing = await getListingByUserId(_id).lean();

    if (listing && listing.photos) {
      await Promise.all(listing.photos.map(generateUrl));
    }
    return res.json({ profile, listing });
  }

  return res.json({ profile });
};

module.exports = async (req, res, next) => {
  const _id = req.params.id || req.user._id;
  const role = req.query.role || req.user.role;

  try {
    await _getProfileBasedRole(_id, role, res);
  } catch (err) {
    next(boom.badImplementation(err));
  }
};
