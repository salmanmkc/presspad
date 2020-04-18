import React from 'react';
import SideMenuLayout from './SideMenuLayout';
import GeneralLayout from './GeneralLayout';
import RightDivLayout from './RightDivLayout';

const Layout = ({ layout, ...props }) => {
  switch (layout) {
    case 'sideMenu':
      return <SideMenuLayout {...props} />;
    case 'rightDiv':
      return <RightDivLayout {...props} />;
    default:
      return <GeneralLayout {...props} />;
  }
};

export default Layout;
