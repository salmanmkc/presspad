const { domain } = require('./../../../config');

const link = (page, data, text) => {
  let href = '';
  switch (page) {
    case 'SINGLE_BOOKING':
      href = `${domain}/booking/${data.bookingId}`;
      break;

    case 'HOST_COMPLETE_PROFILE':
    case 'INTERN_COMPLETE_PROFILE':
      href = `${domain}/my-profile`;
      break;

    case 'HOST_GUIDANCE':
      href = ``; // TODO require PO to provide this
      break;

    case 'INTERN_GUIDANCE':
      href = ``; // TODO require PO to provide this
      break;

    case 'HOST_LOGIN':
    case 'INTERN_LOGIN':
      href = `${domain}/sign-in`;
      break;

    case 'HOSTS_LINK':
      href = `${domain}/hosts`;
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
