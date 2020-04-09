import React from 'react';

import TopMenu from '../../Common/Navigation/TopMenu';
import * as S from './style';
import { withWindowWidth } from '../../../HOCs';

const GeneralLayout = ({ children, isLoggedIn, navbarProps }) => (
  <S.Wrapper>
    <TopMenu
      isLoggedIn={isLoggedIn}
      role={navbarProps.userType}
      resetState={navbarProps.resetState}
    />
    {children}
  </S.Wrapper>
);

export default withWindowWidth(GeneralLayout, true);
