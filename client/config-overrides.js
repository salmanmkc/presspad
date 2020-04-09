const { override, fixBabelImports, addLessLoader } = require('customize-cra');
const path = require('path');

const themePath = path.resolve(__dirname, './theme-vars.less');
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      hack: `true; @import "${themePath}";`,
    },
  }),
);
