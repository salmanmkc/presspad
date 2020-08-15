const mongoose = require('mongoose');
const Listing = require('../../models/Listing');

const updateListing = async (userId, data, s) =>
  Listing.updateOne({ user: userId }, data, {
    omitUndefined: true,
    session: s || (await mongoose.startSession()),
  });

const updateListingAvailableDates = (hostId, dates) =>
  Listing.updateOne(
    { user: hostId },
    { $set: { availableDates: dates } },
    { new: true },
  );

const getAllCities = () =>
  Listing.aggregate([
    { $match: {} },
    {
      $lookup: {
        from: 'profiles',
        localField: 'user',
        foreignField: 'user',
        as: 'profile',
      },
    },
    {
      $project: {
        'address.city': 1,
        verified: { $arrayElemAt: ['$profile.verified', 0] },
        _id: 0,
      },
    },
    {
      $match: {
        verified: true,
      },
    },
  ]);

const deleteListingPhotoQ = (userId, fileNameToBeDeleted) =>
  Listing.updateOne(
    { user: userId },
    {
      $pull: {
        photos: {
          fileName: fileNameToBeDeleted,
        },
      },
    },
  );

module.exports = {
  updateListing,
  updateListingAvailableDates,
  deleteListingPhotoQ,
  getAllCities,
};
