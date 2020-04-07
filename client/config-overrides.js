const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#2F2F2F', // primary color for all components
      '@link-color': '#09C7E7', // link color
    },
  }),
);
// '@primary-color': 'red', // primary color for all components
// '@success-color': 'red', // success state color
// '@warning-color': 'red', // warning state color
// '@error-color': 'red', // error state color
// '@font-size-base': '14px', // major text font size
// '@heading-color': 'rgba(0, 0, 0, .85)', // heading text color
// '@text-color': 'rgba(0, 0, 0, .65)', // major text color
// '@text-color-secondary': 'rgba(0, 0, 0, .45)', // secondary text color
// '@disabled-color': 'rgba(0, 0, 0, .25)', // disable state color
// '@border-radius-base': '4px', // major border radius
// '@border-color-base': 'red', // major border color
// '@box-shadow-base': '0 2px 8px rgba(0, 0, 0, .15)', // major shadow for layers
