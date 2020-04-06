import React from 'react';

import Navbar from '../../Common/Navbar';
import { withWindowWidth } from '../../../HOCs';

const GeneralLayout = ({ children, isLoggedIn, navbarProps }) => (
  <>
    <Navbar
      isLoggedIn={isLoggedIn}
      userType={navbarProps.userType}
      resetState={navbarProps.resetState}
    />
    {children}
  </>
);

export default withWindowWidth(GeneralLayout, true);
