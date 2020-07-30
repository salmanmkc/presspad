import React from 'react';

import { Row, Col } from '../../Common/Grid';
import * as T from '../../Common/Typography';
import { TABLET_WIDTH } from '../../../constants/screenWidths';

const Content = ({ name, windowWidth }) => {
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
        <Col w={[4, 7, 8]} mb={bottomMargins.col[device]}>
          <div style={{ border: '1px solid' }}>
            <SectionTitle>Upcoming Booking</SectionTitle>
          </div>
        </Col>
        <Col w={[4, 5, 4]} mb={bottomMargins.col[device]}>
          <div style={{ border: '1px solid' }}>
            {' '}
            <SectionTitle>My Wallet</SectionTitle>
          </div>
        </Col>
      </Row>
      {/* BOOKING DATES / UPDATES */}
      <Row mb={bottomMargins.row[device]}>
        <Col w={[4, 7, 8]} mb={bottomMargins.col[device]}>
          <div style={{ border: '1px solid' }}>
            {' '}
            <SectionTitle>Booking Details</SectionTitle>
          </div>
        </Col>
        <Col w={[4, 5, 4]} mb={bottomMargins.col[device]}>
          <div style={{ border: '1px solid' }}>
            {' '}
            <SectionTitle>Updates</SectionTitle>
          </div>
        </Col>
      </Row>
      {/* REVIEWS / PAYMENTS / SOCIAL */}
      <Row mb={bottomMargins.row[device]}>
        <Col w={[4, 7, 8]} mb={bottomMargins.col[device]}>
          <div style={{ border: '1px solid' }}>
            {' '}
            <SectionTitle>Recent Reviews</SectionTitle>
          </div>
        </Col>
        <Col w={[4, 5, 4]} mb={bottomMargins.col[device]}>
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
