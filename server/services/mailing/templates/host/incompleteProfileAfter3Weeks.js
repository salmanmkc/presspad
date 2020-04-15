const { link } = require('./../htmlTags');

module.exports = () => {
  const completeProfileLink = link('HOST_COMPLETE_PROFILE', {}, 'here');

  return `
  <main>
    <p>Hi there,</p>
    <p>
      Thanks for signing up to PressPad recently!
    </p>
    <p>
      So that we can let our interns know about you, we need you to click ${completeProfileLink} and complete your online profile!
    </p>
    <p>
      If you have any questions, please don’t hesitate to get in touch with us!
    </p>
  </main>
  `;
};
