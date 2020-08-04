const { domain } = require('./../../../config');

/**
 * create html anchor tag
 * @param {string} page page title, where link will redirect user to
 * @param {string} text text to display for achor tag
 * @param {{bookingId}} data data coming from email params eg. bookingId
 */
const link = (page, text, data = {}) => {
  const hrefs = {
    SINGLE_BOOKING: `${domain}/booking/${data.bookingId}`,
    HOST_COMPLETE_PROFILE: `${domain}/my-profile`,
    INTERN_COMPLETE_PROFILE: `${domain}/my-profile`,
    HOST_GUIDANCE: `${domain}`, // TODO require PO to provide this
    INTERN_GUIDANCE: `${domain}`, // TODO require PO to provide this
    HOST_LOGIN: `${domain}/sign-in`,
    INTERN_LOGIN: `${domain}/sign-in`,
    HOSTS_LINK: `${domain}/hosts`,
    SET_PASSWORD: `${domain}/set-password/${data.token}`,
  };
  const href = hrefs[page];
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
