import React from 'react';

import { Wrapper, ContentWrapper } from './style';
import SideMenu from '../../Common/SideMenu';
import Navbar from '../../Common/Navbar';
import Footer from '../../Common/Footer';
import { withWindowWidth } from '../../../HOCs';
import { TABLET_WIDTH } from '../../../constants/screenWidths';

const BookingFlow = ({ windowWidth, children, isLoggedIn }) => {
  const largerThanTablet = windowWidth >= TABLET_WIDTH;

  return (
    <Wrapper isLoggedIn={isLoggedIn}>
      <div style={{ display: 'flex' }}>
        {(!isLoggedIn || !largerThanTablet) && <Navbar />}
        {isLoggedIn && largerThanTablet && <SideMenu />}
        <ContentWrapper
          largerThanTablet={largerThanTablet}
          isLoggedIn={isLoggedIn}
        >
          {children}
        </ContentWrapper>
      </div>
      {!isLoggedIn && <Footer />}
    </Wrapper>
  );
};

export default withWindowWidth(BookingFlow, true);
