const events = {
  // USER
  USER_SIGNUP: 'user.signup',
  INTERN_SIGNUP: 'user.signup.intern',
  HOST_SIGNUP: 'user.signup.host',
  ORGANISATION_SIGNUP: 'user.signup.organisation',
  // PROFILE
  PROFILE_CREATED: `profile.created`,
  PROFILE_UPDATED: `profile.updated`,
  // BOOKING
  BOOKING_REJECTED: `booking.rejected`,
};

module.exports = events;
