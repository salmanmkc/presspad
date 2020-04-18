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
  BOOKING_REQUESTED: `booking.requested`,
  BOOKING_ACCEPTED_BY_ADMIN: 'booking.accepted_by_admin',
  BOOKING_ACCEPTED_BY_HOST: 'booking.accepted_by_host',
};

module.exports = events;
