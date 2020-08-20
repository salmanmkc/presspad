const { BursaryApplication } = require('../../models');

const createBursaryApplication = data => BursaryApplication.create(data);

module.exports = {
  createBursaryApplication,
};
