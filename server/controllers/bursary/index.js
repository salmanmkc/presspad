const getBursary = require('./getBursary');
const editBursary = require('./editBursary');

module.exports = {
  ...getBursary,
  ...editBursary,
};
