const WithdrawRequest = require('../../models/WithdrawRequest');
const Account = require('../../models/Account');
const { getHostPendingPayments } = require('./getHostPaymentsInfo');
const { getWithdrawRequestsByUserId } = require('../withdrawRequest');

const hostRequestToWithdrawMoney = async ({
  amount,
  bankName,
  sortCode,
  accountNumber,
  user,
  account: accountId,
}) => {
  const account = await Account.findById(accountId);
  const withdrawRequests = await getWithdrawRequestsByUserId(user);
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
    sortCode,
    accountNumber,
    user,
    account: accountId,
  });
};

module.exports = hostRequestToWithdrawMoney;
