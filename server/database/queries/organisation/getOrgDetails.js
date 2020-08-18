const { Organisation } = require('../../models');

const getOrgDetails = id => {
  return Organisation.findOne({ _id: id });
};

module.exports = getOrgDetails;
