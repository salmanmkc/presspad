const boom = require('boom');

const {
  getCoupons: getCouponsQuery,
} = require('../../database/queries/coupon');

module.exports = async (req, res, next) => {
  try {
    const { role: userRole, _id: userId } = req.user;
    const { query } = req; // should be validated within a validate middlware
    let queryProject;

    if (userRole === 'intern') {
      if (!query.code) {
        return next(boom.badData('bad query parameters'));
      }
      queryProject = {
        code: 1,
        days: 1,
        usedDays: 1,
        discountRate: 1,
        startDate: 1,
        endDate: 1,
        intern: 1,
        reservedAmount: 1,
        usedAmount: 1,
      };
    }
    const coupon = await getCouponsQuery(query, queryProject).exec();
    if (!coupon[0]) {
      return next(boom.notFound());
    }

    // check if coupon has been used by another user
    if (coupon[0].intern && coupon[0].intern.toString() !== userId.toString()) {
      return next(
        boom.badRequest('This coupon has already been used by another user.'),
      );
    }

    return res.json({ data: coupon });
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};
