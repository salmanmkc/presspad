const WithdrawRequest = require('../../models/WithdrawRequest');

const updateInternBankDetails = async (withdrawId, bankDetails) => {
  const updateBankDetails = await WithdrawRequest.findByIdAndUpdate(
    withdrawId,
    bankDetails,
    { new: true, useFindAndModify: false },
  );

  return updateBankDetails;
};
module.exports = updateInternBankDetails;
