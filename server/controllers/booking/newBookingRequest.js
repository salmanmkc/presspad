const boom = require('boom');
const moment = require('moment');
const { ObjectId } = require('mongoose').Types;

const {
  checkOtherBookingExists,
  checkIfListingAvailable,
  createNewBooking,
  updateListingAvailability,
} = require('../../database/queries/bookings');
const { calculatePrice } = require('../../helpers/payments');

const { registerNotification } = require('../../services/notifications');

module.exports = async (req, res, next) => {
  try {
    const {
      listing,
      intern,
      host,
      price,
      startDate,
      endDate,
      couponId,
    } = req.body;

    const data = {
      listing,
      intern,
      host,
      startDate,
      endDate,
      price,
    };

    const [userHasBooking, listingUnavailable] = await Promise.all([
      checkOtherBookingExists(intern, startDate, endDate),
      checkIfListingAvailable(listing, startDate, endDate),
    ]);

    // Block 7 days after today
    if (
      moment
        .utc()
        .startOf('day')
        .add(7, 'days')
        .isAfter(startDate)
    ) {
      return next(
        boom.badRequest('you have to book at least 7 days in advance'),
      );
    }
    // check if user already has booking request during requested dates
    if (userHasBooking.bookingExists) {
      return next(
        boom.badRequest('user has already a booking request for those dates'),
      );
    }
    // check if booking request falls into available dates of listing
    if (listingUnavailable.listingUnavailable) {
      return next(
        boom.badRequest('listing is not available during those dates'),
      );
    }
    // validate price
    const calculatedPrice = calculatePrice(moment.range(startDate, endDate));

    if (calculatedPrice !== price) {
      return next(boom.badRequest("Price doesn't match!"));
    }

    // validate discount

    if (couponId && couponId.length > 0) {
      if (!ObjectId.isValid(couponId)) {
        return next(boom.badRequest('invalid coupon Id'));
      }
      data.coupon = couponId;
    }

    const [booking] = await Promise.all([
      createNewBooking(data),
      updateListingAvailability(listing, startDate, endDate),
    ]);

    // EMAIL TO GO HERE TO SEND TO ADMIN THAT NEW BOOKING REQUEST IS READY TO REVIEW

    return res.json({ success: true });
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};
