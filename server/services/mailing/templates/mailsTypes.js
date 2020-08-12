const intern = require('./intern');
const organisation = require('./organisation');
const host = require('./host');
const internAndHost = require('./internAndHost');
const admin = require('./admin');
const all = require('./all');

const types = {
  host: {
    // TODO need to run cron job to check unpaid bookings withing 48hrs
    BOOKING_CANCELED: {
      createBody: host.bookingCancelled, // automated cancellation
      subject: 'Booking cancellation',
      params: ['internName'],
    },
    // done
    BOOKING_CANCELED_BY_HOST: {
      createBody: host.bookingCancelledByHost,
      subject: 'Cancellation',
      params: ['internName'],
    },
    // not implemented yet
    BOOKING_CANCELED_BY_INTERN: {
      createBody: host.bookingCancelledByIntern,
      subject: 'Cancellation request',
      params: [],
    },
    // CANCELLED BY USER BEFORE PAYMENT -> done
    BOOKING_CANCELLED_BY_HOST_BEFORE_PAYMENT: {
      createBody: host.bookingCancelledByHostBeforePayment,
      subject: 'Cancellation',
      params: ['internName'],
    },
    BOOKING_CANCELLED_BY_INTERN_BEFORE_PAYMENT: {
      createBody: host.bookingCancelledByInternBeforePayment,
      subject: 'Cancellation',
      params: ['internName'],
    },
    // CANCELLED BY USER AFTER PAYMENT -> done
    BOOKING_CANCELLED_BY_USER_AFTER_PAYMENT: {
      createBody: host.bookingCancelledByUserAfterPayment,
      subject: 'Cancellation',
      params: ['internName'],
    },
    // done
    BOOKIN_REQUEST: {
      createBody: host.bookingRequest,
      subject: 'Booking request',
      params: ['bookingId'],
    },
    // not implemented yet
    BOOKING_TERMINATED: {
      createBody: host.bookingTerminated,
      subject: 'IMPORTANT! Intern’s booking has been terminated',
      params: ['internName'],
    },
    // done
    BOOKING_UPDATE_WAITING_FOR_PAYMENT: {
      createBody: host.bookingUpdateWaitingForPayment,
      subject: 'Booking update',
      params: [],
    },
    // TODO need to run cron job to check incompleted profiles after 3 weeks
    INCOMPLETE_PROFILE_AFTER_3_WEEKS: {
      createBody: host.incompleteProfileAfter3Weeks,
      subject: 'PressPad needs some more information!',
      params: [],
    },
    // done
    ONE_WEEK_TO_GO: {
      createBody: host.OneWeekToGo,
      subject: 'One week to go!',
      params: ['bookingId'],
    },
    // not implemented yet
    PAYMENT_OVERDUE: {
      createBody: host.paymentOverdue,
      subject: 'IMPORTANT! Payment from intern overdue',
      params: ['internName'],
    },
    // done
    PROFILE_APPROVED: {
      createBody: host.profileApproved,
      subject: 'Congratulations! Your profile has been approved!',
      params: [],
    },
    // done
    VIDEO_PROPERTY_CHECK: {
      createBody: host.videoPropertyCheck,
      subject: 'Video property check',
      params: [],
    },
    // done
    WELCOME: {
      createBody: host.welcome,
      subject: 'Welcome to PressPad!',
      params: [],
    },
  },

  intern: {
    // done
    BOOKING_APPROVED_PAYMENT_NEEDED: {
      createBody: intern.bookingApprovedPaymentNeeded,
      subject: 'Booking accepted!',
      params: [],
    },
    // not implemented yet
    BOOKING_CANCELLED_BY_HOST: {
      createBody: intern.bookingCancelledByHost,
      subject: 'Cancellation',
      params: [],
    },
    // CANCELLED BY USER BEFORE PAYMENT
    BOOKING_CANCELLED_BY_HOST_BEFORE_PAYMENT: {
      createBody: intern.bookingCancelledByHostBeforePayment,
      subject: 'Cancellation',
      params: ['hostName'],
    },
    BOOKING_CANCELLED_BY_INTERN_BEFORE_PAYMENT: {
      createBody: intern.bookingCancelledByInternBeforePayment,
      subject: 'Cancellation',
      params: ['hostName'],
    },
    // CANCELLED BY USER AFTER PAYMENT
    BOOKING_CANCELLED_BY_USER_AFTER_PAYMENT: {
      createBody: intern.bookingCancelledByUserAfterPayment,
      subject: 'Cancellation',
      params: ['internName'],
    },
    // done
    BOOKING_REJECTED: {
      createBody: intern.bookingRejected,
      subject: 'Booking Request', // check the subject title
      params: ['bookingId'],
    },
    // not implemented yet
    BOOKING_REQUEST_RECEIVED: {
      createBody: intern.bookingRequestReceived,
      subject: 'Action Needed: Online Profile',
      params: [],
    },
    // not implemented yet
    BOOKING_TERMINATED: {
      createBody: intern.bookingterminated,
      subject: 'IMPORTANT! Booking terminated',
      params: [],
    },
    // not implemented yet
    HOST_CANCELLATION_AFTER_PAYMENT: {
      createBody: intern.hostCancellationAfterPayment,
      subject: 'Host cancellation',
      params: [],
    },
    INCOMPLETE_PROFILE_AFTER_3_WEEKS: {
      createBody: intern.incompleteProfileAfter3Weeks,
      subject: 'We need some more information!',
      params: [],
    },
    // done
    ONE_WEEK_TO_GO: {
      createBody: intern.oneWeekToGo,
      subject: 'One week to go! ',
      params: ['bookingId'],
    },
    // not implemented yet
    PAYMENT_OVERDUE: {
      createBody: intern.paymentOverdue,
      subject: 'IMPORTANT! Payment overdue',
      params: [],
    },
    // not implemented yet
    PROFILE_APPROVED: {
      createBody: intern.profileApproved,
      subject: 'Congratulations! Your profile has been approved!',
      params: [],
    },
    // not implemented yet
    PROFILE_REJECTED: {
      createBody: intern.profileRejected,
      subject: 'Action Needed: Online Profile',
      params: [],
    },
    // done
    WELCOME: {
      createBody: intern.welcome,
      subject: 'Welcome to PressPad!',
      params: [],
    },
    BURSARY_REJECTED: {
      createBody: intern.bursary.rejected,
      subject: 'sorry! Your bursary has been rejected!',
      params: ['adminMessage'],
    },
    BURSARY_PRE_APPROVED: {
      createBody: intern.bursary.preApproved,
      subject: 'Congratulations! Your bursary has been pre-approved!',
      params: ['adminMessage'],
    },
    BURSARY_APPROVED: {
      createBody: intern.bursary.approved,
      subject: 'Congratulations! Your bursary has been approved!',
      params: ['adminMessage'],
    },
    BURSARY_INVITE_TO_INTERVIEW: {
      createBody: intern.bursary.approved,
      subject: 'Congratulations! You are invited to an interview',
      params: ['adminMessage'],
    },
  },

  internAndHost: {
    // not implemented yet (this should be sent when intern pay instalments)
    // for payment sprint
    BOOKING_COMPLETED: {
      createBody: internAndHost.bookingCompleted,
      subject: 'Congratulations! Your booking is complete!',
      params: ['internName', 'hostName', 'bookingId'],
    },
  },
  // done
  organisation: {
    BOOKING_ACCEPTED: {
      createBody: organisation.bookingAccepted,
      subject: 'Booking accepted!',
      params: ['internName', 'amountSpent', 'couponCode'],
    },

    // not implemented yet
    BOOKING_OVERDUE: {
      createBody: organisation.bookingOverdue,
      subject: ' IMPORTANT! Intern’s booking has been terminated ',
      params: ['internName'],
    },
  },

  admin: {
    DELETE_ACCOUNT: {
      createBody: admin.userDeletedAccount,
      subject: 'User account deleted',
      params: ['reason'],
    },
  },

  all: {
    RESET_PASSWORD: {
      createBody: all.resetPassword,
      subject: 'Reset Password',
      params: ['token', 'name'],
    },
  },
};

module.exports = types;
