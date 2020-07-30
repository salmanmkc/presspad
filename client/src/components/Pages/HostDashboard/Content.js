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

  return (
    <>
      {/* HEADER */}
      <Row mb={5}>
        <Col w={[4, 12, 12]}>
          <T.H2>Welcome back, {firstName}</T.H2>
        </Col>
      </Row>
      {/* NEXT BOOKING / WALLET */}
      <Row mb={bottomMargins.row[device]}>
        <Col w={[4, 7, 8]} mb={bottomMargins.col[device]}>
          <div style={{ border: '1px solid' }}>Upcoming Booking</div>
        </Col>
        <Col w={[4, 5, 4]} mb={bottomMargins.col[device]}>
          <div style={{ border: '1px solid' }}>My Wallet</div>
        </Col>
      </Row>
      {/* BOOKING DATES / UPDATES */}
      <Row mb={bottomMargins.row[device]}>
        <Col w={[4, 7, 8]} mb={bottomMargins.col[device]}>
          <div style={{ border: '1px solid' }}>Booking Details</div>
        </Col>
        <Col w={[4, 5, 4]} mb={bottomMargins.col[device]}>
          <div style={{ border: '1px solid' }}>Updates</div>
        </Col>
      </Row>
      {/* REVIEWS / PAYMENTS / SOCIAL */}
      <Row mb={bottomMargins.row[device]}>
        <Col w={[4, 7, 8]} mb={bottomMargins.col[device]}>
          <div style={{ border: '1px solid' }}>Reviews</div>
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
              Payments
            </div>
            <div style={{ border: '1px solid' }}>Social</div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Content;
