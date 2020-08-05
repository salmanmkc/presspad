const boom = require('boom');
const {
  updateListingAvailableDates,
} = require('../../database/queries/listings');

const updateHostAvailability = async (req, res, next) => {
  //   const currentUser = req.user.id;
  try {
    const { user, body } = req;
    const { dates, acceptBookingsAutomatically } = req.body;

    if (user.role !== 'host') {
      return next(boom.forbidden());
    }

    const [updatedListing, updatedHostAcceptBookings] = await Promise.all([
      updateListingAvailableDates(user._id, dates),
      updateHostAcceptBookings(acceptBookingsAutomatically),
    ]);

    return res.json({ updatedListing, updatedHostAcceptBookings });
  } catch (err) {
    return next(boom.badImplementation(err));
  }
};

module.exports = updateHostAvailability;
