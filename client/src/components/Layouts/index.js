import React from 'react';
import SideMenuLayout from './SideMenuLayout';
import GeneralLayout from './GeneralLayout';

const Layout = ({ layout, ...props }) => {
  switch (layout) {
    case 'sideMenu':
      return <SideMenuLayout {...props} />;

    default:
      return <GeneralLayout {...props} />;
  }
};

export default Layout;
