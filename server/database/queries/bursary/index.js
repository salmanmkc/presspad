const getBursary = require('./getBursary');
const editBursary = require('./editBursary');
const createBursary = require('./createBursary');

module.exports = {
  ...getBursary,
  ...editBursary,
  ...createBursary,
};
