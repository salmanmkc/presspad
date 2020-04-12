const boom = require('boom');
const mongoose = require('mongoose');

const generateUrl = require('./../../helpers/generateFileURL');

// QUERIES
const getInternshipDetailsQuery = require('./../../database/queries/profile/getInternshipDetails');

const getInternshipDetails = async (req, res, next) => {
  try {
    const { _id: userId, role } = req.user;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return next(boom.notFound());
    }

    if (role !== 'intern') {
      return next(boom.forbidden());
    }

    const internshipDetails = await getInternshipDetailsQuery(userId);
    console.log({ internshipDetails });
    // get the offerLetter file links
    if (internshipDetails && internshipDetails.offerLetter) {
      await generateUrl(internshipDetails.offerLetter);
    }

    return res.json(internshipDetails);
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};

module.exports = getInternshipDetails;
