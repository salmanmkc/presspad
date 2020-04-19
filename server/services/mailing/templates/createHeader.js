/**
 * create common header for the template
 * @param {string} subject mail subject line
 */
const createHeader = subject => {
  const header = `
  <header style="text-align: center;">
    <img src="cid:logo"/>
    <h3 style="font-weight=700;">${subject}</h3>
  </header>
  `;

  return header;
};

module.exports = createHeader;
