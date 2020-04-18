const Profile = require('./../models/Profile');

module.exports.updateUserProfile = (userId, data, session) =>
  Profile.findOneAndUpdate({ user: userId }, data, {
    omitUndefined: true,
    session,
    new: true,
  });

module.exports.updateProfile = (profileId, data) =>
  Profile.findByIdAndUpdate({ _id: profileId }, data);

module.exports.findProfile = userId => Profile.findOne({ user: userId });

module.exports.createNewProfile = async (data, session) => {
  const profiles = await Profile.create([data], { session });
  return profiles[0];
};

module.exports.newUpdateUserProfile = (userId, data) =>
  Profile.findOneAndUpdate({ user: userId }, data, { new: true });
