import React from 'react';

import SideMenu from '../../Common/SideMenu';
import Navbar from '../../Common/Navbar';
import Footer from '../../Common/Footer';
import { withWindowWidth } from '../../../HOCs';
import { TABLET_WIDTH } from '../../../constants/screenWidths';

import { Wrapper, ContentWrapper, Content } from './style';

const SideMenuLayout = ({ windowWidth, children, isLoggedIn }) => {
  const largerThanTablet = windowWidth >= TABLET_WIDTH;
  const topHeaderRendered = !largerThanTablet || !isLoggedIn;
  const sideMenuRendered = !topHeaderRendered && isLoggedIn;

  return (
    <>
      <Wrapper topHeaderRendered={topHeaderRendered}>
        {topHeaderRendered && <Navbar />}
        {!topHeaderRendered && <SideMenu />}
        <ContentWrapper sideMenuRendered={sideMenuRendered}>
          <Content>{children}</Content>
        </ContentWrapper>
      </Wrapper>
      {!isLoggedIn && <Footer />}
    </>
  );
};

export default withWindowWidth(SideMenuLayout, true);
