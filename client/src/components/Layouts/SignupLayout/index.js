import React from 'react';

import { withWindowWidth } from '../../../HOCs';
import { TABLET_WIDTH } from '../../../constants/screenWidths';

import InternSteps from './InternSteps';
import HostSteps from './HostSteps';
import OrganisationSteps from './OrganisationSteps';

import * as S from './style';
import * as LoginStyle from '../LoginLayout/style';

import whiteLogo from '../../../assets/white-presspad-logo.png';
import { HOME_URL } from '../../../constants/navRoutes';

const Steps = ({ role }) => {
  switch (role) {
    case 'intern':
      return <InternSteps />;
    case 'organisation':
      return <OrganisationSteps />;
    case 'host':
      return <HostSteps />;

    default:
      return null;
  }
};

const SignupLayout = ({ windowWidth, children, role }) => {
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
        {!topHeaderRendered && <Steps role={role} />}
      </S.Wrapper>
    </>
  );
};

export default withWindowWidth(SignupLayout, true);
