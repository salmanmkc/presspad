const WithdrawRequest = require('../../models/WithdrawRequest');

const reset = () => WithdrawRequest.deleteMany();

const createAll = async ({ users, accounts }) => {
  const { hostUser, internUser } = users;
  const { hostAccount, internAccount } = accounts;

  const withdrawRequests = [
    {
      user: hostUser._id,
      account: hostAccount._id,
      status: 'pending',
      amount: 5000,
      bankName: 'bankName',
      sortCode: 'sortCode',
      accountNumber: 'accountNumber',
      userType: 'host',
    },
    {
      user: hostUser._id,
      account: hostAccount._id,
      status: 'transfered',
      amount: 10000,
      bankName: 'bankName',
      sortCode: 'sortCode',
      accountNumber: 'accountNumber',
      userType: 'host',
    },
    {
      user: internUser._id,
      account: internAccount._id,
      status: 'pending',
      amount: 10000,
      userType: 'intern',
    },
  ];

  const [
    pendingWithdrawRequest,
    transferedWithdrawRequest,
    pendingInternWithdrawRequest,
  ] = await WithdrawRequest.create(withdrawRequests);

  return {
    pendingWithdrawRequest,
    transferedWithdrawRequest,
    pendingInternWithdrawRequest,
  };
};

module.exports = {
  createAll,
  reset,
};
