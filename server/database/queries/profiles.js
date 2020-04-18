const Profile = require('./../models/Profile');

module.exports.updateUserProfile = (userId, data, session) =>
  Profile.updateOne({ user: userId }, data, {
    omitUndefined: true,
    session,
    new: true,
  });

module.exports.updateProfile = (profileId, data) =>
  Profile.findByIdAndUpdate({ _id: profileId }, data);

module.exports.findProfile = userId => Profile.findOne({ user: userId });

module.exports.createNewProfile = (data, session) =>
  Profile.create([data], { session });
