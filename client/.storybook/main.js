const path = require("path")
const themePath = path.resolve(__dirname,"..", './theme-vars.less');

const {
  override,
  fixBabelImports,
  addLessLoader,
} = require("customize-cra");

module.exports = {
  stories: ['../src/**/*.stories.js'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-actions',
    '@storybook/addon-links',
  ],

  webpack: override(
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
  )
};
