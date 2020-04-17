const mongoose = require('mongoose');
const Profile = require('../../models/Profile');

const getInternshipDetails = async userId => {
  const [internshipData] = await Profile.aggregate([
    // match profile
    {
      $match: {
        user: mongoose.Types.ObjectId(userId),
      },
    },
    // filter fields
    {
      $project: {
        organisation: 1,
        internshipStartDate: 1,
        internshipEndDate: 1,
        internshipContact: 1,
        internshipOfficeAddress: 1,
        offerLetter: 1,
      },
    },
  ]);
  return internshipData;
};

module.exports = getInternshipDetails;
