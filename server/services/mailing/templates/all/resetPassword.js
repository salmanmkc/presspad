const { link, greeting, content } = require('./../htmlTags');

module.exports = params => {
  const setPasswordLink = link('SET_PASSWORD', params.token, {
    token: params.token,
  });

  return `
    ${greeting(`Hi ${params.name},`)}

    ${content(
      `We've received your request to reset your password. Click this link to set-up your new password: ${setPasswordLink}`,
    )}
  `;
};
