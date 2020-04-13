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
  const betweenEndDates = moment(endDate)
    .startOf('day')
    .diff(moment(internshipEndDate).startOf('day'), 'days');

  if (betweenStartDates > 3 || betweenEndDates > 3) {
    return false;
  }
  return true;
};
module.exports = {
  capitalizeName,
  checkInternshipDates,
};
