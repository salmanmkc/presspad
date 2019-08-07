const Organisation = require("../models/Organisation");
const Referal = require("../models/Referal");
const User = require("../models/User");
const Profile = require("../models/Profile");
const Review = require("../models/Review");
const Listing = require("../models/Listing");
const Booking = require("../models/Booking");
const Notification = require("../models/Notification");
const Transaction = require("../models/Transaction");
const Account = require("../models/Account");

const resetDB = async () => {
  await Organisation.deleteMany();
  await Referal.deleteMany();
  await User.deleteMany();
  await Profile.deleteMany();
  await Review.deleteMany();
  await Listing.deleteMany();
  await Booking.deleteMany();
  await Notification.deleteMany();
  await Transaction.deleteMany();
  await Account.deleteMany();
};

module.exports = resetDB;
