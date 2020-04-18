const Listing = require('../../models/Listing');

module.exports.getListingByUserId = id => Listing.findOne({ user: id });
