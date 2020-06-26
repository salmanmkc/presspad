const boom = require('boom');
const {
  getHostPaymentsInfo,
  getInternPaymentsInfo,
} = require('../../database/queries/payments');

const getPaymentsInfo = async (req, res, next) => {
  const { role, _id: userId } = req.user;
  let data;
  switch (role) {
    case 'host':
      [data] = await getHostPaymentsInfo(userId);
      break;

    case 'intern':
      [data] = await getInternPaymentsInfo(userId);
      break;

    default:
      return next(boom.notFound());
  }
  res.json(data);
};

module.exports = getPaymentsInfo;
