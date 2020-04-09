import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { withWindowWidth } from '../../../../HOCs';

import Menu from '../Menu';
import Icon from '../../Icon';

import { TABLET_WIDTH } from '../../../../constants/screenWidths';
import { HOME_URL } from '../../../../constants/navRoutes';

import * as S from './style';
import whiteLogo from '../../../../assets/white-presspad-logo.png';

const IconStyle = {
  fontSize: '32px',
  color: 'white',
  cursor: 'pointer',
  position: 'absolute',
  right: '30px',
  top: '20px',
};

const TopMenu = ({ isLoggedIn, role, windowWidth, resetState }) => {
  const [menuOpen, toggleMenu] = useState(false);

  return (
    <S.Wrapper isMobile={windowWidth < TABLET_WIDTH} open={menuOpen}>
      <S.StyledLink to={HOME_URL}>
        <S.Logo src={whiteLogo} alt="logo" />
      </S.StyledLink>
      {windowWidth < TABLET_WIDTH || menuOpen ? (
        <>
          <Icon
            icon={menuOpen ? 'cross' : 'menu'}
            width="40px"
            height="40px"
            customStyle={IconStyle}
            // style={IconStyle}
            onClick={() => toggleMenu(!menuOpen)}
          />
          {menuOpen && (
            <Menu
              role={role}
              isLoggedIn={isLoggedIn}
              resetState={resetState}
              isMobile
              resetMenu={() => toggleMenu(false)}
            />
          )}
        </>
      ) : (
        <Menu
          isLoggedIn={isLoggedIn}
          role={role}
          horizontal
          resetState={resetState}
        />
      )}
    </S.Wrapper>
  );
};

export default withRouter(withWindowWidth(TopMenu));
