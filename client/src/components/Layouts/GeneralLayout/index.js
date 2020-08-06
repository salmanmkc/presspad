import React from 'react';

import TopMenu from '../../Common/Navigation/TopMenu';
import Footer from '../../Common/Footer';
import * as S from './style';
import { withWindowWidth } from '../../../HOCs';

const GeneralLayout = ({ children, isLoggedIn, navbarProps }) => (
  <S.Wrapper>
    <TopMenu
      isLoggedIn={isLoggedIn}
      role={navbarProps.userType}
      resetState={navbarProps.resetState}
    />
    <S.ContentWrapper>
      {children}
      <Footer />
    </S.ContentWrapper>
  </S.Wrapper>
);

export default withWindowWidth(GeneralLayout, true);
