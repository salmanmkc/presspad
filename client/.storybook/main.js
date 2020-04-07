const path = require("path")
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
        '@primary-color': '#2F2F2F', // primary color for all components

      },
    }),
  )
};
