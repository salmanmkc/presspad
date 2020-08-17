const { Organisation } = require('../../models');

const updateOrgDetails = ({ id, updateData }) => {
  return Organisation.findOneAndUpdate({ _id: id }, updateData, {
    new: true,
  });
};

module.exports = updateOrgDetails;
