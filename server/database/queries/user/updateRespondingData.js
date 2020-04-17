const { User } = require('../../models');

const updateRespondingData = (hostId, respondingTimeInMs) =>
  User.findOneAndUpdate(
    { _id: hostId },
    {
      $inc: { respondingTime: respondingTimeInMs, respondedRequests: 1 },
    },
  );

module.exports = updateRespondingData;
