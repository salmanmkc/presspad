const moment = require('moment');

module.exports = (start, end) => {
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

const createSingleDate = date => moment(date).format('DD/MM/YYYY');
module.exports.createSingleDate = createSingleDate;
