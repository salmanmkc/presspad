import moment from 'moment';

import * as yup from 'yup';

export const createStartEndDate = (start, end) => {
  // get all available dates in range
  const currentDate = new Date(start);
  const stopDate = new Date(end);

  return [
    moment(currentDate).format('YYYY-MM-DD'),
    moment(stopDate).format('YYYY-MM-DD'),
  ];
};

export const createDatesArray = (start, end) => {
  const datesArray = [];

  // get all available dates in range
  let currentDate = new Date(start);
  const stopDate = new Date(end);

  while (currentDate <= stopDate) {
    datesArray.push(moment(currentDate).format('YYYY-MM-DD'));
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
      avDatesArray.push(moment(currentDate).format('YYYY-MM-DD'));
      currentDate = moment(currentDate).add(1, 'days');
    }
  });
  // get all days in month of current date and stop date

  return avDatesArray;
};

/**
 * return the time in words eg. 5 minutes ago, few seconds ago
 * @param {Date} time moment time
 */
export const getStringTime = time => moment(time).fromNow();

/**
 * calculate the price giving range of dates
 * @param {import("moment-range").MomentRange} range
 */
export const calculatePrice = range => {
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
    return (days - 14) * 20;
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
  bankSortCode: 1,
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
    const _val = obj[key];
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

export const titleCase = str =>
  str &&
  str
    .split(' ')
    .map(capitalizeFirstLetter)
    .join(' ');

yup.addMethod(yup.string, 'wordLengthValidator', function wordLengthValidator(
  length,
) {
  return this.test(function(value) {
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

export const getDiscountDays = dates => {
  const intersectRange = getIntersectRange(dates);

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
