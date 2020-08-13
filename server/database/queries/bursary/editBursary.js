const Bursary = require('../../models/Bursary');

const editBursaryById = (id, data) => Bursary.findByIdAndUpdate(id, data);

module.exports = {
  editBursaryById,
};
