const WithdrawRequest = require('../../models/WithdrawRequest');
const Account = require('../../models/Account');
const { getHostPendingPayments } = require('./getHostPaymentsInfo');

const hostRequestToWithdrawMoney = async ({
  amount,
  bankName,
  bankSortCode,
  accountNumber,
  user,
  account: accountId,
}) => {
  const account = await Account.findById(accountId);
  const withdrawRequests = await WithdrawRequest.find({
    account,
    status: 'pending',
  });
  const pendingPayments = await getHostPendingPayments(user);

  const requestedAmount = withdrawRequests
    .filter(request => request && request.status === 'pending')
    .reduce((prev, cur) => {
      return prev + cur.amount;
    }, 0);

  if (account.currentBalance - requestedAmount - pendingPayments < amount) {
    return Promise.reject(
      new Error('current balance is less than what you have'),
    );
  }
  return WithdrawRequest.create({
    amount,
    bankName,
    bankSortCode,
    accountNumber,
    user,
    account: accountId,
  });
};

module.exports = hostRequestToWithdrawMoney;
