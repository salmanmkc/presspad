const composeHtml = ({ header, body, footer }) => {
  return `
  ${header}
  <main>
    ${body}
  </main>
  ${footer}
  `;
};

module.exports = composeHtml;
