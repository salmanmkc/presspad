module.exports = postcode => {
  // split by space
  const splited = postcode && postcode.split(' ');
  // get first part
  if (splited && splited.length > 1) {
    // eslint-disable-next-line no-param-reassign
    return splited[0].substring(0, 4);
  }
  // eslint-disable-next-line no-param-reassign
  return postcode
    ? postcode.substring(0, postcode.length - 3).substring(0, 4)
    : '';
};
