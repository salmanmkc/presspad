module.exports = params => {
  return `
  <main>
    <p>Hi there,</p>
    <p>
      This is confirming that you have rejected a booking request from ${params.internName}.
      If you have any questions, please get in touch!
    </p>
  </main>
  `;
};
