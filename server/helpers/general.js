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

module.exports = {
  capitalizeName,
  checkInternshipDates,
  ordinalSuffixOf,
};
