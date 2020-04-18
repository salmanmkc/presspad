const PubSub = require('pubsub-js');
const events = require('./eventTypes');
const Sentry = require('../sentry');

const emit = (event, data) => {
  PubSub.publish(event, data);
};

const listen = (event, listener) => {
  PubSub.subscribe(event, async (_event, data) => {
    try {
      await listener(data);
    } catch (error) {
      Sentry.captureException(error);
    }
  });
};

module.exports = {
  emit,
  listen,
  events,
};
