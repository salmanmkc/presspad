const boom = require('boom');
const Moment = require('moment');
const { extendMoment } = require('moment-range');
const pubSub = require('../../pubSub');

const moment = extendMoment(Moment);

const {
  createCoupon: createCouponQuery,
} = require('../../database/queries/payments');
const { getOrgById } = require('../../database/queries/user');

const { calculatePrice } = require('../../helpers/payments');

const createCoupon = async (req, res, next) => {
  const { user, body } = req;

  const {
    _id: userId,
    role,
    organisation,
    account: organisationAccount,
  } = user;

  const { name, email, discountRate, startDate, endDate, message } = body;

  const range = moment.range(moment(startDate), endDate);
  const amount = calculatePrice(range);
  const days = range.diff('days');

  // check for user role
  if (role !== 'organisation' || !organisation) {
    return next(boom.forbidden());
  }

  try {
    const _organisation = await getOrgById(organisation);

    const results = await createCouponQuery({
      organisationAccount,
      organisation,
      name,
      email,
      message,
      createdBy: userId,
      discountRate,
      days,
      startDate,
      endDate,
      amount: Math.floor((amount * discountRate) / 100),
      usedDays: 0,
    });
    const { code } = results;
    // send email
    pubSub.emit(pubSub.events.coupon.CREATED, {
      name,
      email,
      organisation: _organisation.name,
      couponDetails: { code, message, discountRate, startDate, endDate },
    });

    return res.json(results);
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};

module.exports = createCoupon;
