const events = require('./eventTypes');
const pubSub = require('./createPubSub');

require('./booking');
require('./profile');
require('./user');
require('./coupon');
require('./bursary');

module.exports = {
  emit: pubSub.emit,
  listen: pubSub.listen,
  events,
};
