import React from 'react';

import SideMenu from '../../Common/Navigation/SideMenu';
import Navbar from '../../Common/Navigation/TopMenu';
import Footer from '../../Common/FooterNew';
import { withWindowWidth } from '../../../HOCs';
import { TABLET_WIDTH } from '../../../constants/screenWidths';
import GoBackComponent from '../../Common/GoBack';
import { Wrapper, ContentWrapper, Content, GoBackWrapper } from './style';

const SideMenuLayout = ({
  goBack,
  windowWidth,
  children,
  isLoggedIn,
  navbarProps,
}) => {
  const largerThanTablet = windowWidth >= TABLET_WIDTH;
  const topHeaderRendered = !largerThanTablet || !isLoggedIn;
  const sideMenuRendered = !topHeaderRendered && isLoggedIn;

  return (
    <>
      <Wrapper
        topHeaderRendered={topHeaderRendered}
        sideMenuRendered={sideMenuRendered}
      >
        {topHeaderRendered && (
          <Navbar
            isLoggedIn={isLoggedIn}
            role={navbarProps.userType}
            resetState={navbarProps.resetState}
          />
        )}
        {!topHeaderRendered && (
          <SideMenu
            role={navbarProps.userType}
            isLoggedIn={isLoggedIn}
            resetState={navbarProps.resetState}
          />
        )}
        <ContentWrapper>
          {goBack && (
            <GoBackWrapper>
              <GoBackComponent onClick={goBack} />
            </GoBackWrapper>
          )}
          <Content>{children}</Content>
        </ContentWrapper>
      </Wrapper>
      {!isLoggedIn && <Footer />}
    </>
  );
};

export default withWindowWidth(SideMenuLayout, true);
