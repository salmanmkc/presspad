module.exports = params => {
  return `
  <main>
    <p>Hi there,</p>
    <p>We’re sorry but your recent booking has been cancelled because ${params.internName} didn’t confirm in time.</p>
  </main>
  `;
};
