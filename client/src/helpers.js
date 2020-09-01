import React from 'react';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import * as yup from 'yup';

const moment = extendMoment(Moment);
export const createSingleDate = date => moment(date).format('DD/MM/YYYY');

export const calculateDaysRange = (start, end) => {
  const range = moment.range(moment(start), moment(end));
  range.start.startOf('day');
  range.end.add(1, 'day');
  return range.diff('days');
};

export const createStartEndDate = (start, end) => {
  // get all available dates in range
  const currentDate = new Date(start);
  const stopDate = new Date(end);

  return [
    moment(currentDate).format('DD/MM/YYYY'),
    moment(stopDate).format('DD/MM/YYYY'),
  ];
};

export const createDatesArray = (start, end) => {
  const datesArray = [];

  // get all available dates in range
  let currentDate = new Date(start);
  const stopDate = new Date(end);

  while (currentDate <= stopDate) {
    datesArray.push(moment(currentDate).format('DD/MM/YYYY'));
    currentDate = moment(currentDate).add(1, 'days');
  }

  return datesArray;
};

// creates array of all available dates for listing
export const getDateRangeFromArray = datesArray => {
  const avDatesArray = [];

  // get all available dates in range
  datesArray.forEach(el => {
    let currentDate = moment(el.startDate);
    const stopDate = moment(el.endDate);

    while (currentDate <= stopDate) {
      avDatesArray.push(moment(currentDate).format('DD/MM/YYYY'));
      currentDate = moment(currentDate).add(1, 'days');
    }
  });
  // get all days in month of current date and stop date

  return avDatesArray;
};

/**
 * calculate the price giving range of dates
 * @param {import("moment-range").MomentRange} range moment-range OR number
 */
export const calculatePrice = _range => {
  if (!_range) return 0;
  let days;
  if (typeof _range === 'number') {
    if (_range <= 0) return 0;
    days = _range;
  } else {
    const range = moment.range(_range.start, _range.end);
    range.start.startOf('day');
    range.end.add(1, 'day');
    days = range.diff('days');
  }

  return days * 2000;
};

/**
 * return the time in words eg. 5 minutes ago, few seconds ago
 * @param {Date} time moment time
 */
export const getStringTime = time => moment(time).fromNow();

/**
 * calculate booking the price giving range of dates
 * this will discount the 14 free days
 * @param {import("moment-range").MomentRange} range
 */
export const calculatePriceByRange = range => {
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

  if (weeks >= 2) {
    return (days - 14) * 2000;
  }

  return 0;
};

/**
 * calculate coupon price giving a range of dates
 * this will discount the 14 free days and add 3 days to either side of internship start and end date
 * @param {import("moment-range").MomentRange} range
 */
export const calculateCouponPriceByRange = (
  startDate,
  endDate,
  discountRate,
) => {
  const _start = startDate.clone();
  const _end = endDate.clone();
  const range = moment.range(
    moment(_start).subtract(3, 'day'),
    moment(_end).add(3, 'day'),
  );

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
    return (days - 14) * 2000 * Number(discountRate / 100);
  }

  return 0;
};

// fields to filter based on them
const filterFields = {
  // common
  name: 1,
  status: 1,
  totalPayments: 1,
  currentBalance: 1,
  bookingStatus: 1,

  // clients
  numberOfInterns: 1,
  currentlyHosted: 1,

  // interns
  organisation: 1,
  nextInstallmentAmount: 1,
  nextInstallmentDueDate: 1,

  // hosts
  hometown: 1,
  hosted: 1,
  totalIncome: 1,
  approvalStatus: 1,

  // payments
  user: 1,
  amount: 1,
  bankName: 1,
  accountNumber: 1,
  sortCode: 1,
};

/**
 * search an object and return boalean based on searchVal
 * @private
 * @param {object} obj
 * @param {string} searchVal
 * @returns {boolean}
 */
const _filterObj = (obj, searchVal) =>
  Object.keys(obj).some(key => {
    const _val = obj[key] || '';
    if (typeof _val === 'object' && _val !== null && _val._isAMomentObject) {
      const formattedDate = createSingleDate(_val);
      return formattedDate.includes(searchVal);
    }
    if (typeof _val === 'object') {
      return _filterObj(_val, searchVal);
    }
    if (filterFields[key]) {
      return _val
        .toString()
        .toLowerCase()
        .includes(searchVal.toLowerCase());
    }
    return false;
  });

/**
 * search an Array based on searchVal and return new filtered array
 * @private
 * @param {Array} arr
 * @param {string} searchVal
 * @returns {Array}
 */
const _filterArray = (arr, searchVal) =>
  arr.filter(item => {
    if (Array.isArray(item)) {
      return _filterArray(item, searchVal);
    }
    return _filterObj(item, searchVal);
  });

/**
 * Filter an Array based on search value
 * @param {Array} array source array
 * @param {string} searchVal search value
 * @returns {Array}
 */
export const filterArray = (array, searchVal) => _filterArray(array, searchVal);

export const capitalizeFirstLetter = str =>
  str && str[0].toUpperCase() + str.substr(1, str.length).toLowerCase();

export const titleCase = str => {
  let _str = str;

  if (str instanceof Array) {
    _str = str.join(', ');
  }

  return (
    _str &&
    _str
      .split(' ')
      .map(capitalizeFirstLetter)
      .join(' ')
  );
};

yup.addMethod(yup.string, 'wordLengthValidator', function wordLengthValidator(
  length,
) {
  return this.test(function _wordLengthValidator(value) {
    if (!value) return '';
    return value.split(' ').length <= length
      ? value
      : this.createError({
          message: `Must be less than or equal ${length} words`,
        });
  });
});

export const optionalWordLengthValidator = length => value => {
  if (value) return yup.string().wordLengthValidator(length); // if it was a fine value check normally
  return yup.string().ensure(); // this one sets .default('') and coerces null to ''
};

export const truncatePostcode = postcode => {
  if (postcode.length > 5) {
    return postcode.substr(0, 3);
  }
  return postcode.substr(0, 2);
};

/**
 * get the intersection range between booking and coupon ranges
 * @param {Object} param0 {bookingStart, bookingEnd, couponStart, couponEnd}
 */
export const getIntersectRange = ({
  bookingStart,
  bookingEnd,
  couponStart,
  couponEnd,
}) => {
  const bookingRange = moment.range(moment(bookingStart), moment(bookingEnd));
  const couponRange = moment.range(moment(couponStart), moment(couponEnd));
  return bookingRange.intersect(couponRange);
};

/**
 * get the discount days giving the booking range and the coupon range
 * discountDays = discountDays"from intersectRange" - usedDays.
 * discountRange have all range that intersect with the booking
 * @param {Object} dates {bookingStart, bookingEnd, couponStart, couponEnd, usedDays}
 */
export const getDiscountDays = dates => {
  let _dates = dates;
  if (!dates.installmentDate) {
    _dates = {
      ...dates,
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

  return { discountDays };
};

let id = 0;
export const newId = () => {
  id += 1;
  return id;
};

export const disabledStartDate = ({ endDate, startDate }) => {
  if (!endDate || !startDate) {
    return startDate && startDate < moment().subtract(1, 'day');
  }
  return (
    startDate.valueOf() > endDate.valueOf() ||
    startDate < moment().subtract(1, 'day')
  );
};

export const disabledEndDate = ({ endDate, startDate }) => {
  if (!startDate) {
    return endDate && endDate < moment().endOf('day');
  }

  return (
    endDate.valueOf() <= startDate.valueOf() ||
    startDate < moment().subtract(1, 'day')
  );
};

/**
 * styles the dates in the datePickers
 */
export const dateRender = ({ current, endDate, startDate }) => {
  const style = {};
  let isDisabled = false;
  if (disabledStartDate({ endDate, startDate: current })) {
    isDisabled = true;
    style.backgroundColor = '#e6f7ff';
  }

  // add background to the dates in between the endDate and the startDate
  if (
    endDate &&
    startDate &&
    current.isSameOrBefore(endDate, 'day') &&
    current.isSameOrAfter(startDate, 'day')
  ) {
    return (
      <div
        className={
          isDisabled
            ? 'ant-picker-cell-inner'
            : 'ant-picker-cell-in-view ant-picker-cell-in-range'
        }
        style={{ backgroundColor: '#e6f7ff' }}
      >
        {current.date()}
      </div>
    );
  }

  // add a rounded border on the startDate and the endDate
  if (
    (endDate && current.isSame(endDate, 'day')) ||
    (startDate && current.isSame(startDate, 'day'))
  ) {
    style.borderRadius = '50%';
    style.border = '1px solid';
    return (
      <div className="ant-picker-cell-inner" style={style}>
        {current.date()}
      </div>
    );
  }

  // default
  return <div className="ant-picker-cell-inner">{current.date()}</div>;
};

/**
 * Calculate responding time (days)
 * @param {Number} respondingTime
 * @param {Number} respondedRequests
 */
export const calculateHostRespondingTime = (
  respondingTime,
  respondedRequests,
) => {
  const hostRespondingTime = Math.ceil(
    respondingTime / respondedRequests / (24 * 60 * 60 * 1000),
  );
  return hostRespondingTime || 7;
};

export const formatPrice = (price, fractionDigits) => {
  if (!price) return 0;

  if (!fractionDigits && price % 1 !== 0) {
    // eslint-disable-next-line no-param-reassign
    fractionDigits = 2;
  }
  return (price / 100)
    .toFixed(fractionDigits)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const truncateString = (string, maxLength) =>
  string.length > maxLength ? `${string.slice(0, maxLength)}...` : string;

export const decidePaymentStatus = ({ dueDate }) => {
  let status;
  if (moment(dueDate).isBefore(moment())) {
    status = 'overdue';
  } else if (moment(dueDate).isSame(moment())) {
    status = 'due';
  } else {
    status = 'upcoming';
  }

  return status;
};
