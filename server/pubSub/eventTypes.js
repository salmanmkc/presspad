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
    CANCELLED_BY_USER: 'booking.cancelled_by_user',
    PAID_AUTOMATIC_CANCEL_WARNING: 'booking.paid_automatic_cancel_warning',
    PAID_AUTOMATIC_CANCELLED: 'booking.paid_automatic_cancelled',
    UNPAID_AUTOMATIC_CANCELLED: 'booking.unpaid_automatic_cancelled',
  },
};

module.exports = events;
