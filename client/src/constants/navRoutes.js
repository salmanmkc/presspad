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

export const PAYMENTS_URL = '/payments';
export const WELCOME_PAGES = '/welcome/:id';
export const ADD_FUNDS_URL = '/add-funds';
export const ADD_COUPONS_URL = '/add-coupons';
export const BURSARY = '/bursary';
export const BURSARY_SUCCESS = '/bursary/success';
export const BURSARY_APPLICATION = '/bursary/application';
export const REFERRAL_URL = '/refer';
export const INVOICES = '/invoices';

// editing details
export const SETTINGS_URL = '/settings';
export const SETTINGS = {
  ACCOUNT: `${SETTINGS_URL}/my-account`,
  ABOUT_ME: `${SETTINGS_URL}/about-me`,
  EDIT_PROFILE: `${SETTINGS_URL}/edit-profile`,
  VERIFY: `${SETTINGS_URL}/verify`,
  DELETE_ACCOUNT: `${SETTINGS_URL}/delete-account`,
  DETAILS: `${SETTINGS_URL}/account-details`,
  DELETE_ACCOUNT_SUCCESS: `/delete-account-success`,
  UNDER_REVIEW: `/under-review`,
  BOOK_REVIEW: `/book-review`,
};

// admin routes
export const ADMIN_DASHBOARD_URL = '/admin/dashboard';
export const ADMIN_INTERNS_URL = '/admin/interns';
export const ADMIN_HOSTS_URL = '/admin/hosts';
export const ADMIN_ORGS_URL = '/admin/clients';
export const ADMIN_BOOKINGS_URL = '/admin/bookings';
export const ADMIN_PAYMENTS_URL = '/admin/payments';
export const ADMIN_BURSARY = '/admin/bursary';
export const ADMIN_BURSARY_APPROVE = `${ADMIN_BURSARY}/approve/:id`;
export const ADMIN_BURSARY_PREAPPROVE = `${ADMIN_BURSARY}/pre-approve/:id`;
export const ADMIN_BURSARY_REJECT = `${ADMIN_BURSARY}/reject/:id`;
export const ADMIN_BURSARY_SUCCESS = `${ADMIN_BURSARY}/success/:id`;

// url to view all the data the user has entered in sign up
export const ADMIN_USER_DETAILS = '/admin/user-details/:id';

// signing up process
export const SIGNUP_INTERN = '/sign-up/intern';
export const SIGNUP_HOST = '/sign-up/host';
export const SIGNUP_ORG = '/sign-up/organisation';
export const SIGNUP_ORG_WELCOME = '/sign-up/organisation/welcome';
export const SIGNUP_ORG_ACCOUNT_DETAILS =
  '/sign-up/organisation/account-details';
export const SIGNUP_ORG_CREATE_PROFILE = '/sign-up/organisation/create-profile';
export const SIGNUP_ORG_ADD_FUNDS = '/sign-up/organisation/add-funds';
export const HOST_COMPLETE_PROFILE_URL = '/host-complete-profile';
export const INTERN_COMPLETE_PROFILE_URL = '/intern-complete-profile';
export const DBS_CHECK_PAGE = '/dbs-check';

export const INTERN_SIGNUP_ABOUT_ME = '/sign-up/intern/about-me';
export const INTERN_SIGNUP_BURSARY = '/sign-up/intern/bursary';
export const INTERN_SIGNUP_PROFILE = '/sign-up/intern/profile';
export const INTERN_SIGNUP_VERIFICATIONS = '/sign-up/intern/verifications';
export const INTERN_SIGNUP_WELCOME = '/sign-up/intern/welcome';

export const HOST_SIGNUP_ABOUT_ME = '/sign-up/host/about-me';
export const HOST_SIGNUP_LISTING = '/sign-up/host/listing';
export const HOST_SIGNUP_PROFILE = '/sign-up/host/profile';
export const HOST_SIGNUP_VERIFICATIONS = '/sign-up/host/verifications';
export const HOST_SIGNUP_WELCOME = '/sign-up/host/welcome';

// booking cancellation type urls
export const CANCELLATION_CONFIRM = `/booking-cancel-confirm/:id`;

// sign in/out
export const SIGNIN_URL = '/sign-in';
export const SIGNOUT_URL = '/sign-out';
export const SIGNUP_URL = '/sign-up';

// reset/set password
export const RESET_PASSWORD = '/reset-password';
export const SET_PASSWORD = '/set-password/:token';

// errors
export const Error404 = '/404';
export const Error500 = '/500';
