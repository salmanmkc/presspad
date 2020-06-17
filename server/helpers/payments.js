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
 * Create installments array
 * @param {number} netAmount the remaining amount that the intern has to pay
 * @param {Date} startDate booking starting date
 * @param {Date} endDate booking ending date
 * @param {boolean} upfront true if pay upfront
 * @returns {Array}
 */

exports.createInstallments = ({
  couponInfo,
  bookingDays,
  endDate,
  upfront,
}) => {
  const installments = [];
  let key = 0;
  let _bookingDays = bookingDays;
  const { couponDiscount, discountRate } = couponInfo;

  if (_bookingDays <= 14) return [];
  if (upfront || _bookingDays < 56) {
    const amount = calculatePrice(_bookingDays - 14) - couponDiscount;
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
    amount:
      _bookingDays > 28
        ? (calculatePrice(14) * (100 - discountRate)) / 100
        : (calculatePrice(_bookingDays - 14) * (100 - discountRate)) / 100,
  });
  _bookingDays -= 28;
  while (_bookingDays > 0) {
    key += 1;
    installments.push({
      key,
      dueDate: moment()
        .add(28 * key, 'd')
        .toISOString(),
      amount:
        _bookingDays > 28
          ? (calculatePrice(28) * (100 - discountRate)) / 100
          : (calculatePrice(_bookingDays) * (100 - discountRate)) / 100,
    });
    _bookingDays -= 28;
  }

  return installments;
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
  const _dates = {
    ...dates,
    // do not calculate discount from the first free two weeks
    bookingStart: moment(dates.bookingStart).add(14, 'd'),
  };

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
