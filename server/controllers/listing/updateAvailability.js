const boom = require('boom');
const {
  updateListingAvailableDates,
} = require('../../database/queries/listing');
const {
  updateHostAcceptAutomatically,
} = require('../../database/queries/user');

const { validate } = require('../../middlewares/validation/index');
const {
  updateAvailabilitySchema,
} = require('../../middlewares/validation/hostDashboard');

const updateHostAvailability = async (req, res, next) => {
  try {
    const { user, body } = req;
    const { _id, role } = user;
    const { availableDates, acceptAutomatically } = body;
    console.log('bod', body);
    if (role !== 'host') {
      return next(boom.forbidden());
    }
    if (!body) {
      return next(boom.badData());
    }

    const validRequest = await validate(updateAvailabilitySchema, body);

    if (validRequest) {
      const [updatedListing, updatedHostAcceptBookings] = await Promise.all([
        updateListingAvailableDates(_id, availableDates),
        updateHostAcceptAutomatically(_id, acceptAutomatically),
      ]);

      return res.json({ updatedListing, updatedHostAcceptBookings });
    }
    return next(boom.badData());
  } catch (err) {
    return next(boom.badImplementation(err));
  }
};

module.exports = updateHostAvailability;
