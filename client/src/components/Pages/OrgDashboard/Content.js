import React, { useState, useEffect } from 'react';

import { Row, Col } from '../../Common/Grid';
import * as T from '../../Common/Typography';
import {
  MyAccount,
  AccountDetails,
  Updates,
  Coupons,
  MyImpact,
  InternshipDetails,
  Community,
} from '../../Common/Section';

import { TABLET_WIDTH } from '../../../constants/screenWidths';

import { bottomMargins, typographies } from './styleProperties';

import {
  createCodesTableData,
  calculateTotalCouponsValue,
  getLiveCoupons,
  getPreviousCoupons,
  getCurrentlyHosted,
  getTotalInternsSupported,
} from './utils';

import { Wrapper, Container } from './OrgDashboard.style';

const Content = props => {
  const {
    name = '',
    orgName = '',
    notifications = [],
    account = {},
    windowWidth,
    coupons = [],
    // old
    state,

    onEndChange,
    handleStartOpenChange,
    handleEndOpenChange,
    disabledEndDate,
    onStartChange,
    disabledStartDate,
    onSelectInternChange,
    handleOpenModal,
    handleFilterInInterns,
    onInternSearch,
    handleDiscountChange,
    handleCloseModals,
    handleSubmitCreateCoupon,
    handlePayNowClick,
    handleAccountUpdate,
    markAsSeen,
    handleViewMoreToggle,
    stripe,
  } = props;

  const { currentBalance = 0 } = account;
  const [liveCouponsSrc, setLiveCouponsSrc] = useState(true);

  const firstName = name.split(' ')[0];
  const device = windowWidth < TABLET_WIDTH ? 'mobile' : 'desktop';
  const HeaderTitle = typographies.headerTitle[device];
  const SectionTitle = typographies.sectionTitle[device];

  const liveCoupons = getLiveCoupons(coupons);
  const previousCoupons = getPreviousCoupons(coupons);
  const currentlyHosted = getCurrentlyHosted(coupons);
  const totalInternsSupported = getTotalInternsSupported(coupons);

  return (
    <Wrapper mobile={device === 'mobile'}>
      <Row mb={5}>
        <Col w={[4, 6, 7]}>
          <HeaderTitle color="blue">Welcome {firstName}!</HeaderTitle>
        </Col>
        <Col w={[4, 6, 5]}>
          <HeaderTitle color="pink">{orgName.toUpperCase()}</HeaderTitle>
        </Col>
      </Row>
      <Row mb={bottomMargins.row[device]}>
        {account && (
          <Col w={[4, 12, 7]} mb={bottomMargins.col[device]}>
            <MyAccount
              funds={currentBalance / 100}
              liveCodes={liveCoupons.length}
              liveCodesCost={calculateTotalCouponsValue(liveCoupons) / 100}
              liveBookings={currentlyHosted}
              // addCodes={addCodes}
            />
          </Col>
        )}

        <Col w={[4, 12, 5]}>
          <Container>
            <AccountDetails
              firstName="Abbie"
              lastName="Harper"
              email="abbie@test.com"
              phone="078328828882"
            />
          </Container>
        </Col>
      </Row>
      {coupons && (
        <Row mb={bottomMargins.row[device]}>
          <Col w={[4, 12, 12]} mb={bottomMargins.col[device]}>
            <Coupons
              coupons={
                liveCouponsSrc
                  ? createCodesTableData(liveCoupons)
                  : createCodesTableData(previousCoupons)
              }
              previewClickEvent={() => setLiveCouponsSrc(!liveCouponsSrc)}
              liveCouponsSrc={liveCouponsSrc}
            />
          </Col>
        </Row>
      )}

      <Row mb={bottomMargins.row[device]}>
        {notifications && (
          <Col w={[4, 6, 4]} mb={bottomMargins.col[device]}>
            <Updates
              markAsSeen={markAsSeen}
              updates={notifications}
              userRole="org"
            />
          </Col>
        )}
        {totalInternsSupported && coupons && (
          <Col w={[4, 6, 7]}>
            <MyImpact
              totalInterns={totalInternsSupported && totalInternsSupported}
              totalPaid={coupons && calculateTotalCouponsValue(coupons) / 100}
            />
          </Col>
        )}
      </Row>
      <Row mb={bottomMargins.row[device]}>
        <Col w={[4, 12, 5]}>
          <Container>
            <InternshipDetails
              internOpps={[
                'Internship Scheme A 2020',
                'Ongoing Creative Industry Scheme',
              ]}
            />
          </Container>
        </Col>
        <Col w={[4, 12, 7]}>
          <Community />
        </Col>
      </Row>
    </Wrapper>
  );
};

export default Content;
