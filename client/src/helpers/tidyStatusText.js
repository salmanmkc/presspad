const tidyStatusText = status => {
  switch (status) {
    case 'awaiting admin':
      return 'pending';
    case 'rejected by admin':
      return 'rejected';
    default:
      return status;
  }
};

module.exports = tidyStatusText;
