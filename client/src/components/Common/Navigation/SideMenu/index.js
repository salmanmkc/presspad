import React from 'react';

import * as S from './style';
import * as N from '../../../../constants/navRoutes';
import Menu from '../Menu';

import whiteLogo from '../../../../assets/white-presspad-logo.png';

const SideMenu = ({ role, isLoggedIn, resetState, id }) => (
  <S.Wrapper>
    <S.Link to={N.HOME_URL}>
      <S.Logo src={whiteLogo} alt="logo" />
    </S.Link>
    <Menu role={role} isLoggedIn={isLoggedIn} resetState={resetState} id={id} />
  </S.Wrapper>
);

export default SideMenu;
