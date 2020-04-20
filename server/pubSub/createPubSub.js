const PubSub = require('pubsub-js');
const Sentry = require('../sentry');

const emit = (event, data) => {
  // eslint-disable-next-line no-console
  console.log('published', { event, data });
  PubSub.publish(event, data);
};

const listen = (event, listener) => {
  PubSub.subscribe(event, async (_event, data) => {
    try {
      await listener(data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      Sentry.captureException(error);
    }
  });
};

module.exports = {
  emit,
  listen,
};
