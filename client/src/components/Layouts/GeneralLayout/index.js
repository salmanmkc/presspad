import React from 'react';

import Navbar from '../../Common/Navbar';
import { withWindowWidth } from '../../../HOCs';
import { Wrapper, ContentWrapper } from './style';

const GeneralLayout = ({ children, isLoggedIn, navbarProps }) => (
  <Wrapper>
    <Navbar
      isLoggedIn={isLoggedIn}
      userType={navbarProps.userType}
      resetState={navbarProps.resetState}
    />
    <ContentWrapper>{children}</ContentWrapper>
  </Wrapper>
);

export default withWindowWidth(GeneralLayout, true);
