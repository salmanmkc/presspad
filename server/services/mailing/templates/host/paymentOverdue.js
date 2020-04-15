module.exports = params => {
  return `
  <main>
    <p>Hi there,</p>
    <p>
      The payment from ${params.internName} is now overdue. We have told them that they need to make the payment within the next 48 hours or the booking will be terminated.
    </p>
    <p>
      If you have any questions, please get in touch with us.
    </p>
  </main>
  `;
};
