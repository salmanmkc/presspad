const stripe = jest.genMockFromModule('stripe');

stripe.paymentIntents = {
  create: () => ({ status: 'succeeded' }),
  confirm: () => ({ status: 'succeeded' }),
};
stripe.balanceTransactions = {
  retrieve: () => ({ fee: 426 }),
};

module.exports = () => stripe;
