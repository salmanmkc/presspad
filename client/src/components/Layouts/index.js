import React from 'react';
import SideMenuLayout from './SideMenuLayout';
import GeneralLayout from './GeneralLayout';
import RightDivLayout from './RightDivLayout';
import IllustrationsLayout from './IllustrationsLayout';

const Layout = ({ layout, ...props }) => {
  console.log('props', props);
  switch (layout) {
    case 'sideMenu':
      return <SideMenuLayout {...props} />;
    case 'rightDiv':
      return <RightDivLayout {...props} />;
    case 'illustrations':
      return <IllustrationsLayout {...props} />;
    default:
      return <GeneralLayout {...props} />;
  }
};

export default Layout;
