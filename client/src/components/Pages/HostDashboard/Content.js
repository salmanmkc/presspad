import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from '../../Common/Grid';
import * as T from '../../Common/Typography';
import { BookingCards } from '../../Common/Cards';
import Update from '../../Common/Update';

import {
  Container,
  WalletContainer,
  WalletFooter,
  UpdateList,
} from './HostDashboard.style';
import { bottomMargins, typographies } from './styleProperties';

import { formatPrice } from '../../../helpers';
import { TABLET_WIDTH } from '../../../constants/screenWidths';
import { PAYMENTS_URL } from '../../../constants/navRoutes';
import { colors } from '../../../theme';
import WalletFlower from '../../../assets/wallet-flower.svg';

const Content = ({
  name,
  windowWidth,
  nextBooking,
  role,
  accessibleFunds,
  pending,
  updates,
}) => {
  const firstName = name.split(' ')[0];
  const device = windowWidth < TABLET_WIDTH ? 'mobile' : 'desktop';

  const HeaderTitle = typographies.headerTitle[device];
  const SectionTitle = typographies.sectionTitle[device];
  console.log('up', updates);
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

              <T.H2 mb={2}>£{formatPrice(accessibleFunds)}</T.H2>
              <T.H5 color="darkerGray">£{formatPrice(pending)} pending</T.H5>
              <WalletFooter>
                <Link to={PAYMENTS_URL}>
                  <T.H7C>View Wallet</T.H7C>
                </Link>
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
            <SectionTitle
              style={{ marginBottom: bottomMargins.sectionTitle[device] }}
            >
              Booking Details
            </SectionTitle>
          </div>
        </Col>
        <Col w={[4, 12, 4]} mb={bottomMargins.col[device]}>
          <div style={{ border: '1px solid' }}>
            <SectionTitle
              style={{ marginBottom: bottomMargins.sectionTitle[device] }}
            >
              Updates
            </SectionTitle>
            <UpdateList>
              {updates.length > 0 ? (
                updates.map(item => (
                  <Update item={item} key={item._id} userRole="host" />
                ))
              ) : (
                <T.PXL color={colors.lightestGray}>No updates</T.PXL>
              )}
            </UpdateList>
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
