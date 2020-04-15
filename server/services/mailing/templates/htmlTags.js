const link = (page, data, text) => {
  // TODO add domain and base link
  let href = '';
  switch (page) {
    case 'SINGLE_BOOKING':
      href = `/bookings/${data.bookingId}`;
      break;

    case 'HOST_COMPLETE_PROFILE':
      href = ``;
      break;

    case 'HOST_GUIDANCE':
      href = ``;
      break;

    case 'HOST_LOGIN':
      href = ``;
      break;

    default:
      break;
  }
  return `<a href="${href}">${text}</a>`;
};

module.exports = { link };