import React from 'react';

import SideMenu from '../../Common/SideMenu';
import Navbar from '../../Common/Navbar';
import Footer from '../../Common/Footer';
import { withWindowWidth } from '../../../HOCs';
import { TABLET_WIDTH } from '../../../constants/screenWidths';
import GoBackComponent from '../../Common/GoBack';
import { Wrapper, ContentWrapper, Content, GoBackWrapper } from './style';

const SideMenuLayout = ({
  goBack,
  windowWidth,
  children,
  isLoggedIn,
  role,
}) => {
  const largerThanTablet = windowWidth >= TABLET_WIDTH;
  const topHeaderRendered = !largerThanTablet || !isLoggedIn;
  const sideMenuRendered = !topHeaderRendered && isLoggedIn;

  return (
    <>
      <Wrapper topHeaderRendered={topHeaderRendered}>
        {topHeaderRendered && <Navbar isLoggedIn={isLoggedIn} role={role} />}
        {!topHeaderRendered && <SideMenu />}
        <ContentWrapper sideMenuRendered={sideMenuRendered}>
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
