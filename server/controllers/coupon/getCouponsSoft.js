const boom = require('boom');

const {
  getCoupons: getCouponsQuery,
} = require('../../database/queries/coupon');

module.exports = async (req, res, next) => {
  try {
    const { query } = req; // should be validated within a validate middlware

    if (!query.code) {
      return next(boom.badData('bad query parameters'));
    }

    const queryProject = {
      code: 1,
      days: 1,
      usedDays: 1,
      discountRate: 1,
      startDate: 1,
      endDate: 1,
      intern: 1,
    };

    const coupon = await getCouponsQuery(query, queryProject).exec();
    if (!coupon[0]) {
      return next(boom.notFound());
    }

    if (coupon[0].intern) {
      return next(
        boom.badRequest(
          'This coupon has already been used by a user. If it was you please log in first and try again.',
        ),
      );
    }
    return res.json({ data: coupon });
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};
