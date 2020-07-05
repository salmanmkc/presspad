const tidyStatusText = status => {
  switch (status) {
    case 'awaiting admin':
      return 'pending';
    case 'rejected by admin':
      return 'rejected';
    case 'awaiting cancellation':
      return 'reviewing';
    case 'cancelled after payment':
      return 'cancelled';
    default:
      return status;
  }
};

const tidyStatusTextAdmin = status => {
  switch (status) {
    case 'awaiting cancellation':
    case 'cancelled after payment':
      return 'cancelled after payment!';
    default:
      return status;
  }
};

module.exports = { tidyStatusText, tidyStatusTextAdmin };
