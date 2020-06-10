const boom = require('boom');
// QUERIES
const {
  hostProfileData,
  getListingConfirmedBookings,
} = require('../../database/queries/profile/hostProfile');

const generateUrl = require('../../helpers/generateFileURL');
const { isValidMongoObjectId } = require('../../helpers/isValidMongoObjectId');
const createPostcode = require('../../helpers/createPostcode');

// expect hostId as query param
// responds with data obj: user info, profile, listings, reviews
const getHostProfile = async (req, res, next) => {
  const { id: hostId } = req.params;

  if (!hostId) return next(boom.badRequest('User does not exist'));
  let address = {};

  try {
    if (!isValidMongoObjectId(hostId))
      return next(boom.notFound('Invalid Host ID'));

    const [hostProfile] = await hostProfileData(hostId);

    if (!hostProfile) {
      return next(boom.notFound('Host has no profile or does not exist'));
    }
    const { listing = {} } = hostProfile;
    const {
      _id: listingId = null,
      address: { postcode = '', city = '' } = {},
    } = listing;

    address = {
      addressline1: '',
      addressline2: '',
      postcode: createPostcode(postcode),
      city,
    };

    hostProfile.listing.address = address;

    if (listingId) {
      hostProfile.listingConfirmedBookings = await getListingConfirmedBookings(
        listingId,
      );
    }

    if (!hostProfile || !hostProfile.profile || !hostProfile.listing)
      return next(boom.notFound('Host has no profile or does not exist'));

    if (hostProfile.listing.photos)
      await Promise.all(hostProfile.listing.photos.map(generateUrl));

    await generateUrl(hostProfile.profile.profileImage);

    return res.json({ ...hostProfile, showFullData: false });
  } catch (err) {
    return next(boom.badImplementation(err));
  }
};

module.exports = getHostProfile;
