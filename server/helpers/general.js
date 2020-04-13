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
module.exports = {
  capitalizeName,
  checkInternshipDates,
};
