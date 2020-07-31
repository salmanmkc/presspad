import React from 'react';

import { Row, Col } from '../../Common/Grid';
import * as T from '../../Common/Typography';
import { BookingCards } from '../../Common/Cards';
import Icon from '../../Common/Icon';
import {
  Container,
  WalletContainer,
  WalletFooter,
  ImageContainer,
} from './HostDashboard.style';
import { TABLET_WIDTH } from '../../../constants/screenWidths';
import { colors } from '../../../theme';
import WalletFlower from '../../../assets/wallet-flower.svg';

const Content = ({ name, windowWidth, nextBooking, role }) => {
  const firstName = name.split(' ')[0];
  const device = windowWidth < TABLET_WIDTH ? 'mobile' : 'desktop';

  const bottomMargins = {
    row: {
      desktop: 5,
      mobile: 0,
    },
    col: {
      desktop: 0,
      mobile: 2,
    },
    sectionTitle: {
      desktop: '1rem',
      mobile: '1rem',
    },
  };

  const typographies = {
    headerTitle: {
      desktop: T.H2,
      mobile: T.H3,
    },
    sectionTitle: {
      desktop: T.H4C,
      mobile: T.H6C,
    },
  };
  const HeaderTitle = typographies.headerTitle[device];
  const SectionTitle = typographies.sectionTitle[device];

  return (
    <>
      {/* HEADER */}
      <Row mb={5}>
        <Col w={[4, 12, 12]}>
          <HeaderTitle>Welcome back, {firstName}</HeaderTitle>
        </Col>
      </Row>
      {/* NEXT BOOKING / WALLET */}
      <Row mb={bottomMargins.row[device]}>
        <Col w={[4, 12, 8]} mb={bottomMargins.col[device]}>
          <Container>
            <SectionTitle
              style={{ marginBottom: bottomMargins.sectionTitle[device] }}
            >
              Upcoming Booking
            </SectionTitle>

            {nextBooking ? (
              <BookingCards
                role={role}
                windowWidth={windowWidth}
                type="big"
                startDate={nextBooking.startDate}
                endDate={nextBooking.endDate}
                price={nextBooking.price}
                withUser={nextBooking.withUser}
                bookingID={nextBooking._id}
                withUserType={nextBooking.withUserRole}
                bio={nextBooking.withUserBio}
                interests={nextBooking && nextBooking.withUserInterests}
                status={nextBooking.status}
              />
            ) : (
              <T.PXL color={colors.lightestGray}>No current booking</T.PXL>
            )}
          </Container>
        </Col>
        <Col w={[4, 12, 4]} mb={bottomMargins.col[device]}>
          <div style={{ border: '1px solid' }}>
            {' '}
            <WalletContainer
              style={{ marginTop: device === 'desktop' ? '2rem' : '1rem' }}
              src={WalletFlower}
            >
              <T.H7C mb={2} color="gray">
                My Wallet
              </T.H7C>
              <T.H2 mb={2}>£200.00</T.H2>
              <T.H5 color="darkerGray">£50 pending</T.H5>
              <WalletFooter>
                <T.H7C>View Wallet</T.H7C>
              </WalletFooter>
            </WalletContainer>
          </div>
        </Col>
      </Row>

      {/* BOOKING DATES / UPDATES */}
      <Row mb={bottomMargins.row[device]}>
        <Col w={[4, 12, 8]} mb={bottomMargins.col[device]}>
          <div style={{ border: '1px solid' }}>
            {' '}
            <SectionTitle>Booking Details</SectionTitle>
          </div>
        </Col>
        <Col w={[4, 12, 4]} mb={bottomMargins.col[device]}>
          <div style={{ border: '1px solid' }}>
            {' '}
            <SectionTitle>Updates</SectionTitle>
          </div>
        </Col>
      </Row>
      {/* REVIEWS / PAYMENTS / SOCIAL */}
      <Row mb={bottomMargins.row[device]}>
        <Col w={[4, 12, 8]} mb={bottomMargins.col[device]}>
          <div style={{ border: '1px solid' }}>
            {' '}
            <SectionTitle>Recent Reviews</SectionTitle>
          </div>
        </Col>
        <Col w={[4, 12, 4]} mb={bottomMargins.col[device]}>
          <div
            style={{
              border: '1px solid',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                border: '1px solid',
                marginBottom: '10px',
              }}
            >
              <SectionTitle>Recent Payments</SectionTitle>
            </div>
            <div style={{ border: '1px solid' }}>
              {' '}
              <SectionTitle>Join the Presspad Community</SectionTitle>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Content;
