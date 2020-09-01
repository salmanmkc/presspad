const Moment = require('moment');
const { extendMoment } = require('moment-range');

const moment = extendMoment(Moment);

/**
 * calculate the price giving range of dates
 * @param {import("moment-range").MomentRange} range moment range OR number
 */
const calculatePrice = range => {
  if (!range) return 0;
  let days;

  if (typeof range === 'number') {
    if (range <= 0) return 0;
    days = range;
  } else {
    const _range = moment.range(range.start, range.end);
    _range.start.startOf('day');
    _range.end.add(1, 'day');
    days = _range.diff('days');
  }

  return days * 2000;
};

exports.calculatePrice = calculatePrice;

/**
 * calculate coupon price giving a range of dates
 * this will discount the 14 free days and add 3 days to either side of internship start and end date
 * @param {import("moment-range").MomentRange} range
 */
const calculateCouponPriceByRange = (startDate, endDate, discountRate) => {
  const updatedStartDate = moment(startDate).subtract(3, 'day');
  const updatedEndDate = moment(endDate).add(3, 'day');
  const range = moment.range(updatedStartDate, updatedEndDate);

  if (!range) return 0;
  let weeks;
  let days;
  if (typeof range === 'number') {
    weeks = Math.trunc(range / 7);
    days = range;
  } else {
    range.start.startOf('day');
    range.end.add(1, 'day').endOf('day');
    weeks = range.diff('weeks');
    days = range.diff('days');
  }

  // if more than 2 weeks take off 14 free days and add 6 days (covering 3 before and 3 after internship)
  if (weeks >= 2) {
    return {
      amount: (days - 14) * 2000 * Number(discountRate / 100),
      days,
      updatedStartDate,
      updatedEndDate,
    };
  }

  return 0;
};

exports.calculateCouponPriceByRange = calculateCouponPriceByRange;

/**
 * Create installments array
 * @param {number} netAmount the remaining amount that the intern has to pay
 * @param {Date} startDate booking starting date
 * @param {Date} endDate booking ending date
 * @param {boolean} upfront true if pay upfront
 * @returns {Array}
 */

exports.createInstallments = ({
  startDate,
  endDate,
  upfront,
  couponInfo,
  bookingDays,
  bursaryDiscount,
}) => {
  const installments = [];
  let key = 0;
  let _bookingDays = bookingDays;
  const { couponDiscount } = couponInfo;

  const totalDiscount = couponDiscount + bursaryDiscount;
  const totalDayDiscount = Math.floor(totalDiscount / (bookingDays - 14));

  let remainingDiscount = totalDiscount;

  if (_bookingDays <= 14) return [];
  if (upfront || _bookingDays < 56) {
    const amount = calculatePrice(_bookingDays - 14) - totalDiscount;
    return {
      key,
      dueDate: moment().toISOString(),
      amount,
    };
  }
  if (moment().isAfter(endDate)) return [];

  // push first installment
  installments.push({
    key,
    dueDate: moment().toISOString(),
    amount: calculatePrice(14) - totalDayDiscount * 14,
  });

  _bookingDays -= 28;
  remainingDiscount -= totalDayDiscount * 14;

  while (_bookingDays > 0) {
    key += 1;

    let amount;

    if (_bookingDays > 28) {
      amount = calculatePrice(28) - totalDayDiscount * 28;
      remainingDiscount -= totalDayDiscount * 28;
    } else {
      // last installment
      amount = calculatePrice(_bookingDays) - remainingDiscount;
    }

    installments.push({
      key,
      dueDate: moment(startDate)
        .add(28 * key, 'd')
        .toISOString(),
      amount,
    });
    _bookingDays -= 28;
  }

  return installments;
};

/**
 *
 * @param {object} obj
 * @param {array} obj.installments
 * @param {object} obj.couponInfo
 * @param {number} obj.couponInfo.discountDays
 * @param {number} obj.couponInfo.discountRate
 */
exports.createUpdatedNewInstallments = ({ installments, couponInfo }) => {
  const { discountDays, discountRate } = couponInfo;
  let _discountDays = discountDays;
  return installments.map(installment => {
    if (installment.transaction || _discountDays <= 0)
      return { ...installment };
    const installmentDiscountDays = installment.amount / 2000;

    const installmentDiscount =
      _discountDays > installmentDiscountDays
        ? (installmentDiscountDays * discountRate * 2000) / 100
        : (_discountDays * discountRate * 2000) / 100;

    _discountDays -= installmentDiscountDays;
    return {
      ...installment,
      amount: installment.amount - installmentDiscount,
    };
  });
};

/**
 * get the intersection range between booking and coupon ranges
 * @param {Object} param0 {bookingStart, bookingEnd, couponStart, couponEnd}
 */
const getIntersectRange = ({
  bookingStart,
  bookingEnd,
  couponStart,
  couponEnd,
}) => {
  const bookingRange = moment.range(moment(bookingStart), moment(bookingEnd));
  const couponRange = moment.range(moment(couponStart), moment(couponEnd));
  return bookingRange.intersect(couponRange);
};

exports.getIntersectRange = getIntersectRange;

/**
 * get the discount days giving the booking range and the coupon range
 * @param {Object} dates {bookingStart, bookingEnd, couponStart, couponEnd}
 */
exports.getDiscountDays = dates => {
  let _dates = dates;
  if (!dates.installmentDate) {
    _dates = {
      ...dates,
      // do not calculate discount from the first free two weeks
      bookingStart: moment(dates.bookingStart),
    };
  } else {
    _dates = {
      ...dates,
      // do not calculate paid days
      bookingStart: moment(dates.installmentDate),
    };
  }

  const intersectRange = getIntersectRange(_dates);

  if (!intersectRange) return { discountDays: 0 };

  // reset the time to 00:00 to calculate the start and the end day of the range
  intersectRange.start.startOf('day');

  const discountDays = intersectRange.diff('day') + 1;

  return { discountDays, discountRange: intersectRange };
};

/**
 * get the first unpaid installment
 * @param {Array} installments
 */
exports.getFirstUnpaidInstallment = installments => {
  if (!installments || !Array.isArray(installments) || !installments[0]) {
    return undefined;
  }

  let firstUnpaidInstallment;
  installments.forEach(installment => {
    if (!installment.transaction) {
      if (!firstUnpaidInstallment) {
        firstUnpaidInstallment = installment;
      } else {
        const { dueDate } = installment;
        const { dueDate: firstDueDate } = firstUnpaidInstallment;
        if (moment(dueDate).isBefore(firstDueDate)) {
          firstUnpaidInstallment = installment;
        }
      }
    }
  });
  return firstUnpaidInstallment;
};

/**
 * compare installments
 * @param {array, Object} oldInstallments array or object
 * @param {array, Object} newInstallments array or object
 * @returns boolean
 */
exports.compareInstallments = (oldInstallments, newInstallments) => {
  if (!Array.isArray(oldInstallments) && !Array.isArray(newInstallments)) {
    const { amount, dueDate } = newInstallments;
    const { amount: oldAmount, dueDate: oldDueDate } = oldInstallments;

    if (oldAmount !== amount) return false;
    if (
      !moment(dueDate)
        .startOf('day')
        .isSame(moment(oldDueDate).startOf('day'))
    )
      return false;

    return true;
  }
  return oldInstallments.reduce((acc, curr, i) => {
    const { amount, dueDate } = newInstallments[i];
    const { amount: oldAmount, dueDate: oldDueDate } = curr;

    if (oldAmount !== amount) return false;
    if (
      !moment(dueDate)
        .startOf('day')
        .isSame(moment(oldDueDate).startOf('day'))
    )
      return false;
    return acc;
  }, true);
};
