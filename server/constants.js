module.exports = {
  tokenMaxAge: {
    string: '30d',
    number: 2592000000,
  },
  multerFields: {
    hostCompleteProfile: [
      { name: 'profileImage' },
      { name: 'offerImages1' },
      { name: 'offerImages2' },
      { name: 'offerImages3' },
    ],
    internCompleteProfile: [
      { name: 'profileImage' },
      { name: 'offerLetter' },
      { name: 'photoIDFile' },
    ],
  },
  bookingStatuses: {
    awaitingAdmin: 'awaiting admin',
    pending: 'pending',
    accepted: 'accepted',
    confirmed: 'confirmed',
    cancelled: 'cancelled',
    awaitingCancellation: 'awaiting cancellation',
    cancelledAfterPayment: 'cancelled after payment',
    completed: 'completed',
    rejectedByAdmin: 'rejected by admin',
    rejected: 'rejected',
  },
  resetTokenMaxAge: 3600000,
};
