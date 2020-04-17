const link = (page, data, text) => {
  // TODO add domain and base links
  let href = '';
  switch (page) {
    case 'SINGLE_BOOKING':
      href = `/bookings/${data.bookingId}`;
      break;

    case 'HOST_COMPLETE_PROFILE':
      href = ``;
      break;

    case 'INTERN_COMPLETE_PROFILE':
      href = ``;
      break;

    case 'HOST_GUIDANCE':
      href = ``;
      break;

    case 'INTERN_GUIDANCE':
      href = ``;
      break;

    case 'HOST_LOGIN':
    case 'INTERN_LOGIN':
      href = ``;
      break;

    case 'HOSTS_LINK':
      href = ``;
      break;

    default:
      break;
  }
  return `<a href="${href}">${text}</a>`;
};

const p = (text, style) => {
  return `<p style=${style}>${text}</p>`;
};

const greeting = text => {
  const style = '';
  return p(text, style);
};

const content = text => {
  const style = '';
  return p(text, style);
};
module.exports = { link, greeting, content };
