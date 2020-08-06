const getBursary = require('./getBursary');
const update = require('./update');

module.exports = {
  ...getBursary,
  ...update,
};
