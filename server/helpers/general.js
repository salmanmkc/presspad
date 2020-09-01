const moment = require('moment');

/**
 * capitalize single or combined words
 * @param {String} name -  single or combined words seperated by spaces
 */
const capitalizeName = name =>
  name
    .split(' ')
    .map(_name => `${_name[0].toUpperCase()}${_name.slice(1)}`)
    .join(' ');

const checkInternshipDates = ({
  internshipStartDate,
  internshipEndDate,
  startDate,
  endDate,
}) => {
  const betweenStartDates = moment(internshipStartDate)
    .startOf('day')
    .diff(moment(startDate).startOf('day'), 'days');
  const startDateBeforeInternshipEndDate = moment(startDate)
    .startOf('day')
    .isSameOrBefore(moment(internshipEndDate).startOf('day'));

  const betweenEndDates = moment(internshipEndDate)
    .startOf('day')
    .diff(moment(endDate).startOf('day'), 'days');

  if (
    betweenStartDates <= 3 &&
    startDateBeforeInternshipEndDate &&
    betweenEndDates >= -3
  ) {
    return true;
  }
  return false;
};

const ordinalSuffixOf = i => {
  const j = i % 10;
  const k = i % 100;
  if (j === 1 && k !== 11) {
    return `${i}st`;
  }
  if (j === 2 && k !== 12) {
    return `${i}nd`;
  }
  if (j === 3 && k !== 13) {
    return `${i}rd`;
  }
  return `${i}th`;
};

const isObjectChanged = (newObj, oldObj) => {
  let hasChanged = false;
  function checkChanges(_newObj, _oldObj) {
    if (hasChanged) return;

    let arr;
    if (Array.isArray(_oldObj)) {
      arr = _oldObj;
    } else if (typeof _oldObj === 'object') {
      arr = Object.entries(_oldObj);
    } else {
      throw new Error('Parameters should be typeof object/arrays');
    }

    for (let i = 0; i < arr.length; i += 1) {
      const key = arr[i][0];
      const oldValue = arr[i][1];
      const newValue = _newObj[key];

      if (typeof oldValue !== 'object') {
        if (newValue !== oldValue) {
          hasChanged = true;
          break;
        }
      } else if (oldValue instanceof Date) {
        if (!moment(oldValue).isSame(newValue, 'd')) {
          hasChanged = true;
          break;
        }
      } else {
        checkChanges(newValue, oldValue);
      }
    }
  }

  checkChanges(newObj, oldObj);

  return hasChanged;
};

module.exports = {
  capitalizeName,
  checkInternshipDates,
  ordinalSuffixOf,
  isObjectChanged,
};
