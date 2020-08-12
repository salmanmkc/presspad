import React from 'react';

import { withWindowWidth } from '../../../HOCs';
import { TABLET_WIDTH } from '../../../constants/screenWidths';

import * as S from './style';
import whiteLogo from '../../../assets/white-presspad-logo.png';
import { HOME_URL } from '../../../constants/navRoutes';

const LoginLayout = ({ windowWidth, children, color }) => {
  const largerThanTablet = windowWidth >= TABLET_WIDTH;
  const topHeaderRendered = !largerThanTablet;

  return (
    <>
      <S.Wrapper>
        {topHeaderRendered && (
          <S.ColouredTopDiv color={color}>
            <S.StyledLink to={HOME_URL} left>
              <S.Logo src={whiteLogo} alt="logo" />
            </S.StyledLink>
          </S.ColouredTopDiv>
        )}
        <S.ContentWrapper>{children}</S.ContentWrapper>

        {!topHeaderRendered && (
          <S.ColouredSideDiv color={color}>
            <S.StyledLink to={HOME_URL} right>
              <S.Logo src={whiteLogo} alt="logo" />
            </S.StyledLink>
          </S.ColouredSideDiv>
        )}
      </S.Wrapper>
    </>
  );
};

export default withWindowWidth(LoginLayout, true);
