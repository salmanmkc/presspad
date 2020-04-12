import React from 'react';
import moment from 'moment';
import * as yup from 'yup';

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
    days = range % 7;
  } else {
    range.start.startOf('day');
    range.end.add(1, 'day').endOf('day');
    weeks = range.diff('weeks');
    days = range.diff('days') % 7;
  }
  return weeks * 15000 + days * 2000;
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
  return this.test(value => {
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
