const intern = require('./intern');
const organisation = require('./organisation');
const host = require('./host');
const internAndHost = require('./internAndHost');

const types = {
  host: {
    BOOKING_CANCELED: {
      createBody: host.bookingCancelled, // automated cancellation
      subject: 'Booking cancellation',
      params: ['internName'],
    },
    BOOKING_CANCELED_BY_HOST: {
      createBody: host.bookingCancelledByHost,
      subject: 'Cancellation',
      params: ['internName'],
    },
    BOOKING_CANCELED_BY_INTERN: {
      createBody: host.bookingCancelledByIntern,
      subject: 'Cancellation request',
      params: [],
    },
    BOOKIN_REQUEST: {
      createBody: host.bookingRequest,
      subject: 'Booking request',
      params: ['bookingId'],
    },
    BOOKING_TERMINATED: {
      createBody: host.bookingTerminated,
      subject: 'IMPORTANT! Intern’s booking has been terminated',
      params: ['internName'],
    },
    BOOKING_UPDATE_WAITING_FOR_PAYMENT: {
      createBody: host.bookingUpdateWaitingForPayment,
      subject: 'Booking update',
      params: [],
    },
    INCOMPLETE_PROFILE_AFTER_3_WEEKS: {
      createBody: host.incompleteProfileAfter3Weeks,
      subject: 'PressPad needs some more information!',
      params: [],
    },
    ONE_WEEK_TO_GO: {
      createBody: host.OneWeekToGo,
      subject: 'One week to go!',
      params: [],
    },
    PAYMENT_OVERDUE: {
      createBody: host.paymentOverdue,
      subject: 'IMPORTANT! Payment from intern overdue',
      params: ['internName'],
    },
    PROFILE_APPROVED: {
      createBody: host.profileApproved,
      subject: 'Congratulations! Your profile has been approved!',
      params: [],
    },
    VIDEO_PROPERTY_CHECK: {
      createBody: host.videoPropertyCheck,
      subject: 'Video property check',
      params: [],
    },
    WELCOME: {
      createBody: host.welcome,
      subject: 'Welcome to PressPad!',
      params: [],
    },
  },

  intern: {
    BOOKING_APPROVED_PAYMENT_NEEDED: {
      createBody: intern.bookingApprovedPaymentNeeded,
      subject: 'Booking accepted!',
      params: [],
    },
    BOOKING_CANCELLED_BY_HOST: {
      createBody: intern.bookingCancelledByHost,
      subject: 'Cancellation',
      params: [],
    },
    BOOKING_REJECTED: {
      createBody: intern.bookingRejected,
      subject: 'Booking Request', // check the subject title
      params: ['bookingId'],
    },
    BOOKING_REQUEST_RECEIVED: {
      createBody: intern.bookingRequestReceived,
      subject: 'Action Needed: Online Profile',
      params: [],
    },
    BOOKING_TERMINATED: {
      createBody: intern.bookingterminated,
      subject: 'IMPORTANT! Booking terminated',
      params: [],
    },
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
    ONE_WEEK_TO_GO: {
      createBody: intern.oneWeekToGo,
      subject: 'One week to go! ',
      params: ['bookingId'],
    },
    PAYMENT_OVERDUE: {
      createBody: intern.paymentOverdue,
      subject: 'IMPORTANT! Payment overdue',
      params: [],
    },
    PROFILE_APPROVED: {
      createBody: intern.profileApproved,
      subject: 'Congratulations! Your profile has been approved!',
      params: [],
    },
    PROFILE_REJECTED: {
      createBody: intern.profileRejected,
      subject: 'Action Needed: Online Profile',
      params: [],
    },
    WELCOME: {
      createBody: intern.welcome,
      subject: 'Welcome to PressPad!',
      params: [],
    },
  },

  internAndHost: {
    BOOKING_COMPLETED: {
      createBody: internAndHost.bookingCompleted,
      subject: 'Congratulations! Your booking is complete!',
      params: ['internName', 'hostName', 'bookingId'],
    },
  },
  organisation: {
    BOOKING_ACCEPTED: {
      createBody: organisation.bookingAccepted,
      subject: 'Booking accepted!',
      params: ['internName', 'amountSpent', 'couponCode'],
    },
    BOOKING_OVERDUE: {
      createBody: organisation.bookingOverdue,
      subject: ' IMPORTANT! Intern’s booking has been terminated ',
      params: ['internName'],
    },
  },
};

module.exports = types;
