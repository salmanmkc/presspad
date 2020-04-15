module.exports = params => {
  return `
  <main>
    <p>Hi there,</p>
    <p>
      We’re sorry to inform you that your ${params.internName}’s booking has been terminated because we have not received the overdue payment from them.
    </p>
    <p>
      A member of the PressPad Team will be in touch shortly to help resolve this.
    </p>
  </main>
  `;
};
