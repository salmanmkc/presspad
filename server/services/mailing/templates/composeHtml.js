/**
 * compose html elements and create final layout output
 * @param {{header, body, footer}} param0 html components (layout elements)
 */
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
