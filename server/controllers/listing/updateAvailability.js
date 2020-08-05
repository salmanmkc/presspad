const boom = require('boom');
const {
  updateListingAvailableDates,
} = require('../../database/queries/listings');
const {
  updateHostAcceptAutomatically,
} = require('../../database/queries/user');

const { validate } = require('../../middlewares/validation/index');

const updateHostAvailability = async (req, res, next) => {
  //   const currentUser = req.user.id;
  try {
    const { user, body } = req;
    const { _id, role } = user;
    const { availableDates, acceptAutomatically } = body;

    if (role !== 'host') {
      return next(boom.forbidden());
    }
    if (!availableDates || !acceptAutomatically) {
      return next(boom.badData());
    }
    const validRequest = await validate({
      ...availableDates,
      acceptAutomatically,
    });
    if (validRequest) {
      const [updatedListing, updatedHostAcceptBookings] = await Promise.all([
        updateListingAvailableDates(_id, availableDates),
        updateHostAcceptAutomatically(acceptAutomatically),
      ]);

      return res.json({ updatedListing, updatedHostAcceptBookings });
    }
    return next(boom.badData());
  } catch (err) {
    return next(boom.badImplementation(err));
  }
};

module.exports = updateHostAvailability;
