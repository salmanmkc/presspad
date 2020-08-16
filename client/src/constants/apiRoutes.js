const API_PREFIX = '/api';

const LOGIN_URL = '/user/login'; // to use on the server
const API_LOGIN_URL = `${API_PREFIX}${LOGIN_URL}`; // to use on the client

const SIGNUP_URL = '/user/signup';
const API_SIGNUP_URL = `${API_PREFIX}${SIGNUP_URL}`;

const USER_URL = '/user/check-user';
const API_USER_URL = `${API_PREFIX}${USER_URL}`;
const ACCOUNT_URL = '/user/account';
const API_ACCOUNT_URL = `${API_PREFIX}${ACCOUNT_URL}`;

const GET_ORGS_URL = '/user/get-all-orgs';
const API_GET_ORGS_URL = `${API_PREFIX}${GET_ORGS_URL}`;

const HOST_PROFILE_URL = '/host/:id';
const API_HOST_PROFILE_URL = `${API_PREFIX}${HOST_PROFILE_URL}`;

const HOST_PROFILE_SOFT_URL = '/host-light/:id';
const API_HOST_PROFILE_SOFT_URL = `${API_PREFIX}${HOST_PROFILE_SOFT_URL}`;

const GET_INTERN_STATUS = '/intern/status';
const API_GET_INTERN_STATUS = `${API_PREFIX}${GET_INTERN_STATUS}`;

const INTERN_PROFILE_URL = '/interns/:id/profile/';
const API_INTERN_PROFILE_URL = `${API_PREFIX}${INTERN_PROFILE_URL}`;

const HOST_COMPLETE_PROFILE = '/hosts/complete-profile';
const API_HOST_COMPLETE_PROFILE = `${API_PREFIX}${HOST_COMPLETE_PROFILE}`;

const HOST_UPDATE_AVAILABILITY = '/hosts/update-availability';
const API_HOST_UPDATE_AVAILABILITY = `${API_PREFIX}${HOST_UPDATE_AVAILABILITY}`;

const INTERN_COMPLETE_PROFILE = '/interns/complete-profile';
const API_INTERN_COMPLETE_PROFILE = `${API_PREFIX}${INTERN_COMPLETE_PROFILE}`;

const BOOKING_REQUEST_URL = '/new-booking';
const API_BOOKING_REQUEST_URL = `${API_PREFIX}${BOOKING_REQUEST_URL}`;

const GET_USER_BOOKINGS_URL = '/interns/:id/bookings';
const API_GET_USER_BOOKINGS_URL = `${API_PREFIX}${GET_USER_BOOKINGS_URL}`;

const GET_BOOKING_URL = '/bookings/:id';
const API_GET_BOOKING_URL = `${API_PREFIX}${GET_BOOKING_URL}`;

const GET_BOOKINGS_URL = '/bookings';
const API_GET_BOOKINGS_URL = `${API_PREFIX}${GET_BOOKINGS_URL}`;

const SEARCH_PROFILES_URL = '/search-profiles';
const API_SEARCH_PROFILES_URL = `${API_PREFIX}${SEARCH_PROFILES_URL}`;

const ADMIN_STATS_URL = '/admin-stats';
const API_ADMIN_STATS_URL = `${API_PREFIX}${ADMIN_STATS_URL}`;

const ADMIN_INTERN_PROFILE = '/admin/interns/:id';
const API_ADMIN_INTERN_PROFILE = `${API_PREFIX}${ADMIN_INTERN_PROFILE}`;

const ADMIN_UPDATE_REQUEST_BANK_DETAILS_URL =
  '/admin/update-request-bank-details';
const API_ADMIN_UPDATE_REQUEST_BANK_DETAILS_URL = `${API_PREFIX}${ADMIN_UPDATE_REQUEST_BANK_DETAILS_URL}`;

const ADMIN_HOST_PROFILE = '/admin/hosts/:id';
const API_ADMIN_HOST_PROFILE = `${API_PREFIX}${ADMIN_HOST_PROFILE}`;

const VERIFY_PROFILE_URL = '/verify-profile';
const API_VERIFY_PROFILE_URL = `${API_PREFIX}${VERIFY_PROFILE_URL}`;

const ORGS_DASHBOARD = '/organisation-dashboard';
const API_ORGS_DASHBOARD_URL = `${API_PREFIX}${ORGS_DASHBOARD}`;

const INTERN_DASHBOARD_URL = '/interns/dashboard';
const API_INTERN_DASHBOARD_URL = `${API_PREFIX}${INTERN_DASHBOARD_URL}`;

const MY_PROFILE_URL = '/my-profile';
const API_MY_PROFILE_URL = `${API_PREFIX}${MY_PROFILE_URL}`;

const INTERNSHIP = `${MY_PROFILE_URL}/internship`;
const API_INTERNSHIP_URL = `${API_PREFIX}${INTERNSHIP}`;

const UPLOAD_SIGNED_URL = '/upload/signed-url';
const API_UPLOAD_SIGNED_URL = `${API_PREFIX}${UPLOAD_SIGNED_URL}`;

const REVIEW_URL = '/booking/:id/review';
const API_REVIEW_URL = `${API_PREFIX}${REVIEW_URL}`;

const SIGNOUT_URL = '/sign-out';
const API_SIGNOUT_URL = `${API_PREFIX}${SIGNOUT_URL}`;

const COUPON_URL = '/coupon';
const API_COUPON_URL = `${API_PREFIX}${COUPON_URL}`;

const COUPON_SOFT_URL = '/coupon-light';
const API_COUPON_SOFT_URL = `${API_PREFIX}${COUPON_SOFT_URL}`;

const BOOKING_REVIEW_INFO_URL = '/review-info/:bookingId';
const API_BOOKING_REVIEW_INFO_URL = `${API_PREFIX}${BOOKING_REVIEW_INFO_URL}`;

const INTERN_PAYMENT_URL = '/interns/payment';
const API_INTERN_PAYMENT_URL = `${API_PREFIX}${INTERN_PAYMENT_URL}`;

const COUPONS_URL = '/coupons';
const API_COUPONS_URL = `${API_PREFIX}${COUPONS_URL}`;

const INTERNS_URL = '/interns';
const API_INTERNS_URL = `${API_PREFIX}${INTERNS_URL}`;

const HOST_DASHBOARD_URL = '/host/dashboard';
const API_HOST_DASHBOARD_URL = `${API_PREFIX}${HOST_DASHBOARD_URL}`;

const PAYMENTS_URL = '/payments';
const API_PAYMENTS_URL = `${API_PREFIX}${PAYMENTS_URL}`;

const DONATION_URL = '/payments/donate';
const API_DONATION_URL = `${API_PREFIX}${DONATION_URL}`;

const WITHDRAW_REQUEST_URL = '/payments/withdraw-request';
const API_WITHDRAW_REQUEST_URL = `${API_PREFIX}${WITHDRAW_REQUEST_URL}`;

const UPDATE_WITHDRAW_REQUEST_URL = '/payments/withdraw-request/:id';
const API_UPDATE_WITHDRAW_REQUEST_URL = `${API_PREFIX}${UPDATE_WITHDRAW_REQUEST_URL}`;

const ACCEPT_BOOKING_URL = '/bookings/:id/accept';
const API_ACCEPT_BOOKING_URL = `${API_PREFIX}${ACCEPT_BOOKING_URL}`;

const REJECT_BOOKING_URL = '/bookings/:id/reject';
const API_REJECT_BOOKING_URL = `${API_PREFIX}${REJECT_BOOKING_URL}`;

const CANCEL_BOOKING_URL = '/bookings/:id/cancel';
const API_CANCEL_BOOKING_URL = `${API_PREFIX}${CANCEL_BOOKING_URL}`;

const CANCEL_BOOKING_AFTER_PAYMENT_URL = '/bookings/:id/cancelafterpayment';
const API_CANCEL_BOOKING_AFTER_PAYMENT_URL = `${API_PREFIX}${CANCEL_BOOKING_AFTER_PAYMENT_URL}`;

const ORG_PAYMENT_URL = '/org/payment';
const API_ORG_PAYMENT_URL = `${API_PREFIX}${ORG_PAYMENT_URL}`;

const FIND_WITHDRAW_REQUESTS_URL = '/withdraw-requests';
const API_FIND_WITHDRAW_REQUESTS_URL = `${API_PREFIX}${FIND_WITHDRAW_REQUESTS_URL}`;

const GET_ALL_CETIES_URL = '/listing-cities';
const API_GET_ALL_CETIES_URL = `${API_PREFIX}${GET_ALL_CETIES_URL}`;

const UPDATE_CHECKLIST_ANSWER = '/checklists/answers/:id';
const API_UPDATE_CHECKLIST_ANSWER = `${API_PREFIX}${UPDATE_CHECKLIST_ANSWER}`;

const GET_CHECKLIST = '/checklists/bookings/:bookingId/user/:userId';
const API_GET_CHECKLIST = `${API_PREFIX}${GET_CHECKLIST}`;

const NOTIFICATION_URL = '/notifications';
const API_NOTIFICATION_URL = `${API_PREFIX}${NOTIFICATION_URL}`;

const REVIEWS = '/reviews';
const API_REVIEWS = `${API_PREFIX}${REVIEWS}`;

const ADMIN_REVIEWS_BOOKING = '/admin/bookings';
const API_ADMIN_REVIEWS_BOOKING = `${API_PREFIX}${ADMIN_REVIEWS_BOOKING}`;

const ADMIN_BOOKING_HISTORY = '/admin/booking-history';
const API_ADMIN_BOOKING_HISTORY = `${API_PREFIX}${ADMIN_BOOKING_HISTORY}`;

const ADMIN_UPDATE_PROFILE = '/admin/update-profile';
const API_ADMIN_UPDATE_PROFILE = `${API_PREFIX}${ADMIN_UPDATE_PROFILE}`;

const USER_BASE = '/user';
const API_USER_BASE = `${API_PREFIX}${USER_BASE}`;

const RESET_PASSWORD = '/user/reset-password';
const API_RESET_PASSWORD = `${API_PREFIX}${RESET_PASSWORD}`;

const SET_PASSWORD = '/user/set-password';
const API_SET_PASSWORD = `${API_PREFIX}${SET_PASSWORD}`;

const BURSARY = '/bursary';
const API_BURSARY = `${API_PREFIX}${BURSARY}`;
const BURSARY_WINDOWS = '/bursary/windows';
const API_BURSARY_WINDOWS = `${API_PREFIX}${BURSARY_WINDOWS}`;
const BURSARY_APPLICATIONS = '/bursary/applications';
const API_BURSARY_APPLICATIONS = `${API_PREFIX}${BURSARY_APPLICATIONS}`;
const UPDATE_BURSARY_APPLICATIONS = '/bursary/applications/:id';
const API_UPDATE_BURSARY_APPLICATIONS = `${API_PREFIX}${UPDATE_BURSARY_APPLICATIONS}`;
const INTERN_SETTINGS_MY_ACCOUNT = '/settings/intern/my-account';
const API_INTERN_SETTINGS_MY_ACCOUNT = `${API_PREFIX}${INTERN_SETTINGS_MY_ACCOUNT}`;

const INTERN_SETTINGS_ABOUT_ME = '/settings/intern/about-me';
const API_INTERN_SETTINGS_ABOUT_ME = `${API_PREFIX}${INTERN_SETTINGS_ABOUT_ME}`;

const INTERN_SETTINGS_MY_PROFILE = '/settings/intern/my-profile';
const API_INTERN_SETTINGS_MY_PROFILE = `${API_PREFIX}${INTERN_SETTINGS_MY_PROFILE}`;

const INTERN_SETTINGS_VERIFICATIONS = '/settings/intern/verifications';
const API_INTERN_SETTINGS_VERIFICATIONS = `${API_PREFIX}${INTERN_SETTINGS_VERIFICATIONS}`;

const MY_BURSARY = '/my-bursary';
const API_MY_BURSARY = `${API_PREFIX}${MY_BURSARY}`;

const SINGLE_BURSARY = '/bursary/:id';
const API_SINGLE_BURSARY = `${API_PREFIX}${SINGLE_BURSARY}`;

const TOP_ADMIN_STATS = '/admin/summary';
const API_TOP_ADMIN_STATS = `${API_PREFIX}${TOP_ADMIN_STATS}`;

const BURSARY_APPLICATIONS_STATUS = '/bursary/applications/status';
const API_BURSARY_APPLICATIONS_STATUS = `${API_PREFIX}${BURSARY_APPLICATIONS_STATUS}`;

module.exports = {
  // CLIENT
  API_LOGIN_URL,
  API_SIGNUP_URL,
  API_SIGNOUT_URL,
  API_USER_URL,
  API_ACCOUNT_URL,
  API_GET_ORGS_URL,
  API_HOST_COMPLETE_PROFILE,
  API_INTERN_COMPLETE_PROFILE,
  API_HOST_PROFILE_URL,
  API_HOST_PROFILE_SOFT_URL,
  API_INTERN_PROFILE_URL,
  API_BOOKING_REQUEST_URL,
  API_GET_USER_BOOKINGS_URL,
  API_GET_BOOKING_URL,
  API_GET_BOOKINGS_URL,
  API_SEARCH_PROFILES_URL,
  API_ADMIN_STATS_URL,
  API_VERIFY_PROFILE_URL,
  API_ORGS_DASHBOARD_URL,
  API_INTERN_DASHBOARD_URL,
  API_MY_PROFILE_URL,
  API_UPLOAD_SIGNED_URL,
  API_REVIEW_URL,
  API_COUPON_URL,
  API_COUPON_SOFT_URL,
  API_GET_INTERN_STATUS,
  API_BOOKING_REVIEW_INFO_URL,
  API_INTERN_PAYMENT_URL,
  API_COUPONS_URL,
  API_INTERNS_URL,
  API_HOST_DASHBOARD_URL,
  API_PAYMENTS_URL,
  API_DONATION_URL,
  API_WITHDRAW_REQUEST_URL,
  API_ACCEPT_BOOKING_URL,
  API_REJECT_BOOKING_URL,
  API_CANCEL_BOOKING_URL,
  API_CANCEL_BOOKING_AFTER_PAYMENT_URL,
  API_ORG_PAYMENT_URL,
  API_FIND_WITHDRAW_REQUESTS_URL,
  API_UPDATE_WITHDRAW_REQUEST_URL,
  API_GET_ALL_CETIES_URL,
  API_UPDATE_CHECKLIST_ANSWER,
  API_GET_CHECKLIST,
  API_ADMIN_INTERN_PROFILE,
  API_ADMIN_HOST_PROFILE,
  API_NOTIFICATION_URL,
  API_REVIEWS,
  API_INTERNSHIP_URL,
  API_ADMIN_REVIEWS_BOOKING,
  API_ADMIN_BOOKING_HISTORY,
  API_ADMIN_UPDATE_PROFILE,
  API_ADMIN_UPDATE_REQUEST_BANK_DETAILS_URL,
  API_USER_BASE,
  API_SET_PASSWORD,
  API_RESET_PASSWORD,
  API_BURSARY,
  API_BURSARY_WINDOWS,
  API_BURSARY_APPLICATIONS,
  API_UPDATE_BURSARY_APPLICATIONS,
  API_INTERN_SETTINGS_MY_ACCOUNT,
  API_INTERN_SETTINGS_ABOUT_ME,
  API_INTERN_SETTINGS_MY_PROFILE,
  API_INTERN_SETTINGS_VERIFICATIONS,
  API_HOST_UPDATE_AVAILABILITY,
  API_MY_BURSARY,
  API_SINGLE_BURSARY,
  API_TOP_ADMIN_STATS,
  API_BURSARY_APPLICATIONS_STATUS,

  // SERVER
  LOGIN_URL,
  SIGNUP_URL,
  SIGNOUT_URL,
  USER_URL,
  ACCOUNT_URL,
  GET_ORGS_URL,
  HOST_COMPLETE_PROFILE,
  INTERN_COMPLETE_PROFILE,
  HOST_PROFILE_URL,
  HOST_PROFILE_SOFT_URL,
  INTERN_PROFILE_URL,
  BOOKING_REQUEST_URL,
  GET_USER_BOOKINGS_URL,
  GET_BOOKING_URL,
  GET_BOOKINGS_URL,
  SEARCH_PROFILES_URL,
  ADMIN_STATS_URL,
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
  ACCEPT_BOOKING_URL,
  REJECT_BOOKING_URL,
  CANCEL_BOOKING_URL,
  CANCEL_BOOKING_AFTER_PAYMENT_URL,
  ORG_PAYMENT_URL,
  FIND_WITHDRAW_REQUESTS_URL,
  UPDATE_WITHDRAW_REQUEST_URL,
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
  ADMIN_UPDATE_REQUEST_BANK_DETAILS_URL,
  USER_BASE,
  RESET_PASSWORD,
  SET_PASSWORD,
  BURSARY,
  BURSARY_WINDOWS,
  BURSARY_APPLICATIONS,
  UPDATE_BURSARY_APPLICATIONS,
  INTERN_SETTINGS_MY_ACCOUNT,
  INTERN_SETTINGS_ABOUT_ME,
  INTERN_SETTINGS_MY_PROFILE,
  INTERN_SETTINGS_VERIFICATIONS,
  HOST_UPDATE_AVAILABILITY,
  MY_BURSARY,
  SINGLE_BURSARY,
  TOP_ADMIN_STATS,
  BURSARY_APPLICATIONS_STATUS,
};
