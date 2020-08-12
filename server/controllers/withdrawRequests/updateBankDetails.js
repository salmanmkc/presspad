const boom = require('boom');
const { updateBankDetails } = require('../../database/queries/withdrawRequest');

const updateWithdrawBankDetails = async (req, res, next) => {
  try {
    const { requestId, bankDetails } = req.body;

    console.log('reached', bankDetails);

    // only admin is allowed to view all withdrawal requests on presspad.a
    if (req.user.role !== 'admin')
      return next(
        boom.forbidden('Forbidden: Only admin can access this route'),
      );
    if (!requestId || !bankDetails) {
      return next(boom.badData('missing parameters'));
    }
    const update = await updateBankDetails(requestId, bankDetails);
    return res.json(update);
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};

module.exports = updateWithdrawBankDetails;
