const { link } = require('./../htmlTags');

module.exports = () => {
  const loginLink = link('HOST_LOGIN', {}, 'here');

  return `
  <main>
    <p>Hi there,</p>
    <p>
      Thanks for signing up to PressPad!
    </p>
    <p>
      To be listed as a media mentor-host on our website, you’ll need to login ${loginLink} and complete your online profile.
    </p>
    <p>
      Once you’ve done that, we can get the ball rolling and find you an intern to host and mentor for the duration of their placement.
    </p>
    <p>
      If you have any questions, please don’t hesitate to get in touch with us!
    </p>
 
  </main>
  `;
};
