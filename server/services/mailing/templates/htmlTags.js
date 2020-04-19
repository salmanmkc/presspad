const { domain } = require('./../../../config');
/**
 * create html anchor tag
 * @param {string} page page title, where link will redirect user to
 * @param {{bookingId}} data data coming from email params eg. bookingId
 * @param {string} text text to display for achor tag
 */
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
/**
 * create and return html p tag that wraps the given text
 * @param {string} text wrapped text
 * @param {string} style inline style
 */
const p = (text, style) => {
  return `<p style=${style}>${text}</p>`;
};

/**
 * wrap the greeting text and create special style for it
 * @param {string} text wrapped text
 */
const greeting = text => {
  const style = '';
  return p(text, style);
};

/**
 * wrap the content text and create special style for it
 * @param {string} text wrapped text
 */
const content = text => {
  const style = '';
  return p(text, style);
};

module.exports = { link, greeting, content };
