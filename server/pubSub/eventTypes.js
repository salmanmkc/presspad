const events = {
  // USER
  user: {
    INTERN_SIGNUP: 'user.signup.intern',
    HOST_SIGNUP: 'user.signup.host',
    ORGANISATION_SIGNUP: 'user.signup.organisation',
  },
  profile: {
    CREATED: `profile.created`,
    UPDATED: `profile.updated`,
    APPROVED: `profile.approved`,
    COMPLETED: `profile.completed`,
  },
  booking: {
    REJECTED: `booking.rejected`,
    REQUESTED: `booking.requested`,
    ACCEPTED_BY_ADMIN: 'booking.accepted_by_admin',
    ACCEPTED_BY_HOST: 'booking.accepted_by_host',
  },
};

module.exports = events;
