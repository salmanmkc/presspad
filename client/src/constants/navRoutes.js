// website sections
export const HOME_URL = '/';
export const ABOUT_URL = '/about';
export const MYPROFILE_URL = '/my-profile';
export const DASHBOARD_URL = '/dashboard';
export const HOSTS_URL = '/hosts';
export const HOST_PROFILE = '/host/:id';
export const HOST_PROFILE_SOFT = '/host-light/:id';
export const INTERN_PROFILE = '/interns/:id';
export const BOOKING_VIEW_URL = '/booking/:id';
export const ADD_REVIWE_URL = '/review-info/:id/';
export const BOOKINGS_URL = '/bookings';
export const BOOKINGS_INTERNSHIP_URL = '/bookings/update-internship';

export const SETTINGS = '/settings';
export const SETTINGS_MY_ACCOUNT = `${SETTINGS}/my-account`;
export const SETTINGS_ABOUT_ME = `${SETTINGS}/about-me`;
export const SETTINGS_MY_PROFILE = `${SETTINGS}/my-profile`;
export const SETTINGS_VERIFICATIONS = `${SETTINGS}/verifications`;
export const SETTINGS_DELETE_ACCOUNT = `${SETTINGS}/delete-account`;
export const SETTINGS_DELETE_ACCOUNT_SUCCESS =
  '/settings/delete-account-success';

export const DELETE_ACCOUNT_SUCCESS = '/settings/account-deleted';
export const PAYMENTS_URL = '/payments';

// admin routes
export const ADMIN_DASHBOARD_URL = '/admin/dashboard';
export const ADMIN_INTERNS_URL = '/admin/interns';
export const ADMIN_HOSTS_URL = '/admin/hosts';
export const ADMIN_ORGS_URL = '/admin/clients';
export const ADMIN_BOOKINGS_URL = '/admin/bookings';
export const ADMIN_PAYMENTS_URL = '/admin/payments';

// signing up process
export const SIGNUP_INTERN = '/sign-up/intern';
export const SIGNUP_HOST = '/sign-up/host';
export const SIGNUP_ORG = '/sign-up/organisation';
export const HOST_COMPLETE_PROFILE_URL = '/host-complete-profile';
export const INTERN_COMPLETE_PROFILE_URL = '/intern-complete-profile';
export const DBS_CHECK_PAGE = '/dbs-check';

// booking cancellation type urls
export const CANCELLATION_CONFIRM = `/booking-cancel-confirm/:id`;

// sign in/out
export const SIGNIN_URL = '/sign-in';
export const SIGNOUT_URL = '/sign-out';

// reset/set password
export const RESET_PASSWORD = '/reset-password';
export const SET_PASSWORD = '/set-password/:token';

// errors
export const Error404 = '/404';
export const Error500 = '/500';
