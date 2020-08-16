const router = require('express').Router();

// IMPORT CONTROLLERS
const loginController = require('../controllers/user/login');
const userInfo = require('../controllers/user/userInfo');
const accountInfo = require('../controllers/user/accountInfo');
const signUpController = require('../controllers/user/signup');
const getAllOrgs = require('../controllers/user/getAllOrgs');
const hostsCompleteProfile = require('../controllers/hostsCompleteProfile');
const internsCompleteProfile = require('../controllers/user/internsCompleteProfile');
const getHostProfile = require('../controllers/profile/getHostProfile');
const getHostProfileSoft = require('../controllers/profile/getHostProfileSoft');
const hostViewInternProfile = require('../controllers/profile/hostViewInternProfile');
const getInternProfile = require('../controllers/profile/getInternProfile');
const searchProfiles = require('../controllers/profile/searchProfiles');
const getInternshipDetails = require('../controllers/profile/getInternshipDetails');
const updateInternshipDetails = require('../controllers/profile/updateInternshipDetails');
const deleteAccount = require('../controllers/user/deleteAccount');
const internSettings = require('../controllers/user/internSettings');
const { getMyBursary, editBursary } = require('../controllers/bursary');
const {
  viewBooking,
  getUserBookings,
  newBookingRequest,
  acceptBooking,
  rejectBooking,
  cancelBooking,
  getBookingsWithUsers,
  getActiveBookingsApi,
  adminReviewsBooking,
  getBookingHistoryApi,
  bookingsApi,
} = require('../controllers/booking');
const adminStats = require('../controllers/stats/adminStats');
const verifyProfile = require('../controllers/profile/verifyProfile');
const {
  internDashboard,
  hostDashboard,
  orgDashboard,
} = require('../controllers/dashboard');
const getMyProfile = require('../controllers/profile/getMyProfile');
const { getUploadSignedURL } = require('../controllers/storage');
const { postReview, getReviews } = require('../controllers/review');
const signOut = require('../controllers/user/signOut');
const { getCoupons, getCouponsSoft } = require('../controllers/coupon');
const getInternStatus = require('../controllers/profile/getInternStatus');
const {
  internPayment,
  withdrawRequest,
  confirmOrCancelWithdrawRequest,
  orgPayment,
  getPaymentsInfo,
  cancelBookingAfterPayment,
} = require('../controllers/payments');
const { createCoupon } = require('../controllers/coupons');
const getAllInterns = require('../controllers/user/getAllInterns');
const resetPassword = require('../controllers/user/resetPassword');
const setPassword = require('../controllers/user/setPassword');
const hostDonation = require('../controllers/payments/hostDonation');
const { getAllCities } = require('../controllers/listing');
const deletListingPhotos = require('../controllers/profile/deletListingPhotos');
const {
  updateChecklistAnswer,
  getChecklist,
} = require('../controllers/checklist');
const { markAsSeen } = require('../controllers/notifications');
const { updateProfile } = require('../controllers/profile/updateProfile');

// controller for admin to view all withdraw requests in presspad
const viewWithdrawRequests = require('../controllers/withdrawRequests');
const updateBankDetails = require('../controllers/withdrawRequests/updateBankDetails');

const {
  getBursaryWindows,
  getBursaryApplications,
  upsertBursaryWindows,
  updateBursaryApplication,
  getBursaryApplicationInfo,
  getMyBursaryApplicationStatus,
} = require('../controllers/bursary');

// IMPORT MIDDLEWARES
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

// const softAuthCheck = require("./../middlewares/softAuthCheck");
const { validation, validation2 } = require('../middlewares/validation');

const hostUpdateAvailability = require('../controllers/listing/updateAvailability');

const getTopAdminStats = require('../controllers/stats/topAdminStats');

// API ROUTES
const {
  LOGIN_URL,
  USER_URL,
  ACCOUNT_URL,
  SIGNUP_URL,
  SIGNOUT_URL,
  GET_ORGS_URL,
  HOST_PROFILE_URL,
  HOST_COMPLETE_PROFILE,
  HOST_UPDATE_AVAILABILITY,
  INTERN_COMPLETE_PROFILE,
  SEARCH_PROFILES_URL,
  BOOKING_REQUEST_URL,
  GET_USER_BOOKINGS_URL,
  GET_BOOKING_URL,
  GET_BOOKINGS_URL,
  ADMIN_STATS_URL,
  INTERN_PROFILE_URL,
  VERIFY_PROFILE_URL,
  ORGS_DASHBOARD,
  INTERN_DASHBOARD_URL,
  MY_PROFILE_URL,
  UPLOAD_SIGNED_URL,
  REVIEW_URL,
  COUPON_URL,
  COUPON_SOFT_URL,
  GET_INTERN_STATUS,
  BOOKING_REVIEW_INFO_URL,
  INTERN_PAYMENT_URL,
  COUPONS_URL,
  INTERNS_URL,
  HOST_DASHBOARD_URL,
  PAYMENTS_URL,
  DONATION_URL,
  WITHDRAW_REQUEST_URL,
  UPDATE_WITHDRAW_REQUEST_URL,
  ACCEPT_BOOKING_URL,
  REJECT_BOOKING_URL,
  CANCEL_BOOKING_URL,
  CANCEL_BOOKING_AFTER_PAYMENT_URL,
  ORG_PAYMENT_URL,
  FIND_WITHDRAW_REQUESTS_URL,
  GET_ALL_CETIES_URL,
  UPDATE_CHECKLIST_ANSWER,
  GET_CHECKLIST,
  ADMIN_INTERN_PROFILE,
  ADMIN_HOST_PROFILE,
  NOTIFICATION_URL,
  REVIEWS,
  INTERNSHIP,
  ADMIN_REVIEWS_BOOKING,
  ADMIN_BOOKING_HISTORY,
  ADMIN_UPDATE_PROFILE,
  HOST_PROFILE_SOFT_URL,
  ADMIN_UPDATE_REQUEST_BANK_DETAILS_URL,
  USER_BASE,
  RESET_PASSWORD,
  SET_PASSWORD,
  BURSARY_WINDOWS,
  BURSARY_APPLICATIONS,
  UPDATE_BURSARY_APPLICATIONS,
  INTERN_SETTINGS_MY_ACCOUNT,
  INTERN_SETTINGS_ABOUT_ME,
  INTERN_SETTINGS_MY_PROFILE,
  INTERN_SETTINGS_VERIFICATIONS,
  MY_BURSARY,
  SINGLE_BURSARY,
  TOP_ADMIN_STATS,
  BURSARY_APPLICATIONS_STATUS,
} = require('../../client/src/constants/apiRoutes');

// add validation middleware
router.use(validation);
router.use(validation2);
// accept booking by id
router.patch(ACCEPT_BOOKING_URL, authentication, acceptBooking);

// reject booking by id
router.patch(REJECT_BOOKING_URL, authentication, rejectBooking);

// cancel booking by id
router.patch(CANCEL_BOOKING_URL, authentication, cancelBooking);

// cancel booking by id
router.post(
  CANCEL_BOOKING_AFTER_PAYMENT_URL,
  authentication,
  cancelBookingAfterPayment,
);

// Host view intern profile
router.get(INTERN_PROFILE_URL, authentication, hostViewInternProfile);

// get HOST dashboard data
router.get(HOST_DASHBOARD_URL, authentication, hostDashboard);
// gets hosts profile data (unauthenticated user)
router.get(HOST_PROFILE_SOFT_URL, getHostProfileSoft);
// gets hosts profile data (authenticated user)
router.get(HOST_PROFILE_URL, authentication, getHostProfile);

// update host profile and create new offer
router.post(HOST_COMPLETE_PROFILE, authentication, hostsCompleteProfile);

// delete the photo from the host listings
router.patch(HOST_COMPLETE_PROFILE, authentication, deletListingPhotos);

// update listing availability and host setting to accept booking automatically (host dashboard)
router.patch(HOST_UPDATE_AVAILABILITY, authentication, hostUpdateAvailability);

// update intern profile
router.post(INTERN_COMPLETE_PROFILE, authentication, internsCompleteProfile);

// get user info from the cookie if it exists and send to front end
router.get(USER_URL, authentication, userInfo);
router.get(ACCOUNT_URL, authentication, accountInfo);

// gets intern profile data
router.get(INTERN_PROFILE_URL, authentication, getInternProfile);

// approve or reject profile
router.post(VERIFY_PROFILE_URL, authentication, verifyProfile);

// check if user profile verfied and has coplete profile
router.get(GET_INTERN_STATUS, authentication, getInternStatus);

// creates new booking request
router.post(
  BOOKING_REQUEST_URL,
  authentication,
  authorization(['intern']),
  newBookingRequest,
);

// view booking by id
router.get(GET_BOOKING_URL, authentication, viewBooking);

// get all user bookings
router.get(GET_USER_BOOKINGS_URL, getUserBookings);

// get user bookings for bookings page
router.get(GET_BOOKINGS_URL, authentication, bookingsApi);

// get all active bookings
router.get(
  ADMIN_REVIEWS_BOOKING,
  authentication,
  authorization(['admin']),
  getActiveBookingsApi,
);

// get all old bookings
router.get(
  ADMIN_BOOKING_HISTORY,
  authentication,
  authorization(['admin']),
  getBookingHistoryApi,
);

// search for available listings
router.post(SEARCH_PROFILES_URL, searchProfiles);

// get stats for admin dashboard
router.post(ADMIN_STATS_URL, authentication, adminStats);

// USE CONTROLLERS
router.post(LOGIN_URL, loginController);
router.post(SIGNUP_URL, signUpController);
router.get(GET_ORGS_URL, getAllOrgs);

// Orgs
router.get(ORGS_DASHBOARD, authentication, orgDashboard);

// Get intern dashboard
router.get(INTERN_DASHBOARD_URL, authentication, internDashboard);

// GET MY PROFILE
router.get(MY_PROFILE_URL, authentication, getMyProfile);

// GET INTERN PROFILE FOR ADMIN
router.get(ADMIN_INTERN_PROFILE, authentication, getMyProfile);

// GET HOST PROFILE FOR ADMIN
router.get(ADMIN_HOST_PROFILE, authentication, getMyProfile);

// Upload a file
router.get(UPLOAD_SIGNED_URL, authentication, getUploadSignedURL);

// ORG create a coupon
router.post(COUPONS_URL, authentication, createCoupon);

// admin || org get all interns
router.get(
  INTERNS_URL,
  authentication,
  authorization(['admin', 'organisation']),
  getAllInterns,
);

// get payments info
router.get(PAYMENTS_URL, authentication, getPaymentsInfo);

// host donate to presspad
router.post(DONATION_URL, authentication, hostDonation);

// host request to withdraw money
router.post(WITHDRAW_REQUEST_URL, authentication, withdrawRequest);

// admin cancel or confirm request to withdraw money
router.patch(
  UPDATE_WITHDRAW_REQUEST_URL,
  authentication,
  confirmOrCancelWithdrawRequest,
);

// admin updates withdraw / payment request bank details

router.patch(
  ADMIN_UPDATE_REQUEST_BANK_DETAILS_URL,
  authentication,
  authorization(['admin']),
  updateBankDetails,
);

// admin confirms or rejects booking request
router.patch(
  ADMIN_REVIEWS_BOOKING,
  authentication,
  authorization(['admin']),
  adminReviewsBooking,
);

// organisation add funds
router.post(ORG_PAYMENT_URL, authentication, orgPayment);

// Reviews
router.route(REVIEW_URL).post(authentication, postReview);

// Coupons
router.route(COUPON_URL).get(authentication, getCoupons);

router.get(COUPON_SOFT_URL, getCouponsSoft);

// Signout
router.route(SIGNOUT_URL).get(signOut);

router.route(BOOKING_REVIEW_INFO_URL).get(authentication, getBookingsWithUsers);

router
  .route(FIND_WITHDRAW_REQUESTS_URL)
  .get(authentication, viewWithdrawRequests);

// payments
router.route(INTERN_PAYMENT_URL).post(authentication, internPayment);

router.get(GET_ALL_CETIES_URL, getAllCities);

// host | intern update the checklist answer
router.patch(UPDATE_CHECKLIST_ANSWER, authentication, updateChecklistAnswer);

// host | intern get the checklist for a booking
router.get(GET_CHECKLIST, authentication, getChecklist);

// [ host | intern | orgs ] mark their notifications as seen
router.patch(`${NOTIFICATION_URL}/seen`, authentication, markAsSeen);

// admin updates a user's profile
router.patch(
  `${ADMIN_UPDATE_PROFILE}`,
  authentication,
  authorization(['admin']),
  updateProfile,
);

// get reviews (given || taken)
router.get(REVIEWS, getReviews);

router.get(INTERNSHIP, authentication, getInternshipDetails);
router.put(INTERNSHIP, authentication, updateInternshipDetails);

router.delete(USER_BASE, authentication, deleteAccount);

router.post(RESET_PASSWORD, resetPassword);
router.post(SET_PASSWORD, setPassword);

router.get(
  BURSARY_APPLICATIONS_STATUS,
  authentication,
  getMyBursaryApplicationStatus,
);

router.get(
  BURSARY_WINDOWS,
  authentication,
  authorization(['admin', 'intern']),
  getBursaryWindows,
);
router.put(
  BURSARY_WINDOWS,
  authentication,
  authorization(['admin']),
  upsertBursaryWindows,
);

router.get(
  BURSARY_APPLICATIONS,
  authentication,
  authorization(['admin']),
  getBursaryApplications,
);

router.get(
  UPDATE_BURSARY_APPLICATIONS,
  authentication,
  authorization(['admin']),
  getBursaryApplicationInfo,
);

router.patch(
  UPDATE_BURSARY_APPLICATIONS,
  authentication,
  authorization(['admin']),
  updateBursaryApplication,
);

router.patch(
  INTERN_SETTINGS_MY_ACCOUNT,
  authentication,
  internSettings.myAccount,
);

router.patch(INTERN_SETTINGS_ABOUT_ME, authentication, internSettings.aboutMe);

router.patch(
  INTERN_SETTINGS_MY_PROFILE,
  authentication,
  internSettings.myProfile,
);

router.patch(
  INTERN_SETTINGS_VERIFICATIONS,
  authentication,
  internSettings.verifications,
);

router.get(MY_BURSARY, authentication, getMyBursary);
router.patch(SINGLE_BURSARY, authentication, editBursary);

// get summary stats
router.get(TOP_ADMIN_STATS, authentication, getTopAdminStats);

module.exports = router;
