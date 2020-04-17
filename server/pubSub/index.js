const PubSub = require('pubsub-js');

const emit = (event, data) => {
  console.log({ data });
  PubSub.publish(event, data);
};

const listen = (event, listener) => {
  PubSub.subscribe(event, (_event, data) => listener(data));
};

module.exports = {
  emit,
  listen,
};
