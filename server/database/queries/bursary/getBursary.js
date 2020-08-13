const Bursary = require('../../models/Bursary');

const getBursaryByUserId = id => Bursary.findOne({ intern: id }).lean();

module.exports = {
  getBursaryByUserId,
};
