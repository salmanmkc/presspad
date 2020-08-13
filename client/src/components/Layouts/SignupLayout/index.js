import React from 'react';

import { withWindowWidth } from '../../../HOCs';
import { TABLET_WIDTH } from '../../../constants/screenWidths';

import InternSteps from './InternSteps';

import * as S from './style';
import * as LoginStyle from '../LoginLayout/style';

import whiteLogo from '../../../assets/white-presspad-logo.png';
import { HOME_URL } from '../../../constants/navRoutes';

const SignupLayout = ({ windowWidth, children }) => {
  const largerThanTablet = windowWidth >= TABLET_WIDTH;
  const topHeaderRendered = !largerThanTablet;

  return (
    <>
      <S.Wrapper>
        {topHeaderRendered && (
          <LoginStyle.ColouredTopDiv color="blue">
            <LoginStyle.StyledLink to={HOME_URL} left>
              <LoginStyle.Logo src={whiteLogo} alt="logo" />
            </LoginStyle.StyledLink>
          </LoginStyle.ColouredTopDiv>
        )}

        <S.ContentWrapper>{children}</S.ContentWrapper>
        {!topHeaderRendered && <InternSteps />}
      </S.Wrapper>
    </>
  );
};

export default withWindowWidth(SignupLayout, true);
