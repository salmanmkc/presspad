import React from 'react';
import SideMenuLayout from './SideMenuLayout';
import GeneralLayout from './GeneralLayout';
import RightDivLayout from './RightDivLayout';
import IllustrationsLayout from './IllustrationsLayout';
import LoginLayout from './LoginLayout';
import SignupLayout from './SignupLayout';

const Layout = ({ layout, ...props }) => {
  switch (layout) {
    case 'sideMenu':
      return <SideMenuLayout {...props} />;
    case 'rightDiv':
      return <RightDivLayout {...props} />;
    case 'illustrations':
      return <IllustrationsLayout {...props} />;
    case 'login':
      return <LoginLayout {...props} />;
    case 'signup':
      return <SignupLayout {...props} />;
    default:
      return <GeneralLayout {...props} />;
  }
};

export default Layout;
