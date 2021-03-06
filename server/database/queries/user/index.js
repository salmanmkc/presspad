const mongoose = require('mongoose');
const User = require('../../models/User');
const Booking = require('../../models/Booking');
const Review = require('../../models/Review');
const Bursary = require('../../models/Bursary');
const Profile = require('../../models/Profile');
const Listing = require('../../models/Listing');

const { addOrg, getOrgById } = require('./organisation');
const updateRespondingData = require('./updateRespondingData');
const getUserByBursaryApplicationId = require('./getUserByBursaryApplicationId');
const { createNewAccount } = require('../account');
const { bookingStatuses } = require('../../../constants');

module.exports.findByEmail = email =>
  User.findOne({ email: email.toLowerCase() });

module.exports.findByReferralToken = token =>
  User.findOne({ referralToken: token.toLowerCase() });

module.exports.getUserById = (id, withoutPassword = true) =>
  withoutPassword
    ? User.findById(id, { password: 0 }).exec()
    : User.findById(id).exec();

module.exports.getUserByBursaryId = async id => {
  const bursary = await Bursary.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(id),
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'intern',
        foreignField: '_id',
        as: 'intern',
      },
    },
  ]);

  return bursary && bursary[0] && bursary[0].intern && bursary[0].intern[0];
};
module.exports.addNewUser = async userInfo => {
  const { email, name, password, role, referralToken, referredBy } = userInfo;

  const newAccount = await createNewAccount();

  if (role === 'organisation') {
    const { organisation, logo } = userInfo;
    const newOrg = await addOrg(organisation, logo, newAccount._id);
    return User.create({
      email: email.toLowerCase(),
      name,
      password,
      role,
      organisation: newOrg,
      account: newAccount._id,
    });
  }

  if (role === 'host') {
    const createdUser = await User.create({
      email: email.toLowerCase(),
      name,
      password,
      role,
      account: newAccount._id,
      referralToken,
      referredBy,
    });

    await Promise.all([
      Listing.create({ user: createdUser._id }),
      Profile.create({ user: createdUser._id }),
    ]);

    return createdUser;
  }

  // assume it's intern at this point
  const createdUser = await User.create({
    email: email.toLowerCase(),
    name,
    password,
    role,
    account: newAccount._id,
  });

  // create empty bursary document
  await Promise.all([
    Bursary.create({ intern: createdUser._id }),
    Profile.create({ user: createdUser._id }),
  ]);
  return createdUser;
};

module.exports.getInternStatus = internId =>
  Booking.aggregate([
    // get all the bookings for that intern
    {
      $match: { intern: mongoose.Types.ObjectId(internId) },
    },
    //  get only bookings that haven't ended yet
    {
      $match: { endDate: { $gt: new Date() } },
    },
    // return all the bookings that are either at host, confirmed or pending
    {
      $project: {
        status: {
          $switch: {
            branches: [
              {
                case: {
                  $and: [
                    { $lte: ['$startDate', new Date()] },
                    { $gte: ['$endDate', new Date()] },
                    { $eq: ['$status', bookingStatuses.confirmed] },
                  ],
                },
                then: 'at host',
              },
              {
                case: {
                  $and: [
                    { $gt: ['$startDate', new Date()] },
                    { $eq: ['$status', bookingStatuses.pending] },
                  ],
                },
                then: 'Pending request',
              },
              {
                case: {
                  $and: [
                    { $gt: ['$startDate', new Date()] },
                    {
                      $or: [
                        { $eq: ['$status', bookingStatuses.confirmed] },
                        { $eq: ['$status', bookingStatuses.completed] },
                      ],
                    },
                  ],
                },
                then: 'Booking confirmed',
              },
            ],
            default: 'Looking for host',
          },
        },
      },
    },
  ]);

module.exports.getUserReviews = userId =>
  new Promise((resolve, reject) => {
    Review.aggregate([
      // match user
      {
        $match: { to: mongoose.Types.ObjectId(userId) },
      },
      // lookup user
      {
        $lookup: {
          from: 'users',
          localField: 'from',
          foreignField: '_id',
          as: 'from_user',
        },
      },
      {
        $unwind: '$from_user',
      },
      {
        $lookup: {
          from: 'profiles',
          localField: 'from',
          foreignField: 'user',
          as: 'from_profile',
        },
      },
      {
        $unwind: '$from_profile',
      },
      {
        $project: {
          _id: 0,
          'from_user.name': 1,
          'from_profile.jobTitle': 1,
          message: 1,
          createdAt: 1,
          rating: 1,
        },
      },
    ])
      .then(response => resolve(response))
      .catch(error => reject(error));
  });

module.exports.getUserOrg = userId =>
  User.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: 'organisations',
        localField: 'organisation',
        foreignField: '_id',
        as: 'organisation',
      },
    },
    {
      $addFields: {
        organisation: {
          $arrayElemAt: ['$organisation', 0],
        },
      },
    },
    { $replaceRoot: { newRoot: '$organisation' } },
  ]);

module.exports.getAllInterns = () =>
  User.find({ role: 'intern' }, { password: 0 });

module.exports.deleteUser = ({ id, deleteReason }) =>
  User.findByIdAndUpdate(id, {
    email: null,
    name: 'Deleted User',
    password: null,
    deleteReason,
    deleted: true,
  });

module.exports.updateUserById = (userId, data) =>
  User.findByIdAndUpdate(
    userId,
    { $set: data },
    // return the updated document
    { new: true },
  );

module.exports.updateHostAcceptAutomatically = (hostId, acceptAutomatically) =>
  User.findByIdAndUpdate(
    hostId,
    { $set: { acceptAutomatically } },
    { new: true },
  );

module.exports.findUserByToken = token =>
  User.findOne({
    'resetToken.value': token,
    'resetToken.expiresIn': { $gt: Date.now() },
  });

module.exports.updateRespondingData = updateRespondingData;
module.exports.getOrgById = getOrgById;
module.exports.getUserByBursaryApplicationId = getUserByBursaryApplicationId;
