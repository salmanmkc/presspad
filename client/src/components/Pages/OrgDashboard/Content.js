import React, { useState, useEffect } from 'react';
import moment from 'moment';

import { Row, Col } from '../../Common/Grid';
import * as T from '../../Common/Typography';
import {
  MyAccount,
  AccountDetails,
  Updates,
  Coupons,
} from '../../Common/Section';

import { TABLET_WIDTH } from '../../../constants/screenWidths';
import { HOSTS_URL, ADD_FUNDS_URL } from '../../../constants/navRoutes';
import { bottomMargins, typographies } from './styleProperties';
import {
  calculatePrice,
  formatPrice,
  createSingleDate,
} from '../../../helpers';

import { Wrapper } from './OrgDashboard.style';

const createCodesTableData = arr =>
  arr.map(el => {
    const {
      code,
      startDate,
      endDate,
      usedAmount,
      reservedAmount,
      status,
      intern,
    } = el;

    return {
      code,
      startDate: createSingleDate(startDate),
      endDate: createSingleDate(endDate),
      usedAmount: formatPrice(usedAmount),
      reservedAmount: formatPrice(reservedAmount),
      status,
      id: intern._id,
      internName: intern.name,
    };
  });

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

  console.log('coupons', coupons);
  console.log('account', account);

  const firstName = name.split(' ')[0];
  const device = windowWidth < TABLET_WIDTH ? 'mobile' : 'desktop';
  const HeaderTitle = typographies.headerTitle[device];
  const SectionTitle = typographies.sectionTitle[device];

  // My Account
  const liveCoupons = coupons.filter(
    item => moment(item.endDate).valueOf() >= moment().valueOf(),
  );
  const previousCoupons = coupons.filter(
    item =>
      moment(item.endDate).valueOf() <= moment().valueOf() &&
      moment(item.startDate).valueOf() < moment().valueOf(),
  );
  const currentlyHosted = coupons.filter(item => item.status === 'At host')
    .length;

  console.log('live', liveCoupons);
  console.log('prev', previousCoupons);

  const liveCouponsTotalValue = liveCoupons
    .map(el => el.reservedAmount)
    .reduce((a, b) => a + b, 0);

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
          <Col w={[4, 10, 7]} mb={bottomMargins.col[device]}>
            <MyAccount
              funds={currentBalance / 100}
              liveCodes={liveCoupons.length}
              liveCodesCost={liveCouponsTotalValue / 100}
              liveBookings={currentlyHosted}
              // addCodes={addCodes}
            />
          </Col>
        )}

        <Col w={[4, 10, 5]}>
          <AccountDetails
            firstName="Abbie"
            lastName="Harper"
            email="abbie@test.com"
            phone="078328828882"
          />
        </Col>
      </Row>
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
      <Row mb={bottomMargins.row[device]}>
        <Col w={[4, 10, 4]} mb={bottomMargins.col[device]}>
          <Updates
            markAsSeen={markAsSeen}
            updates={notifications}
            userRole="org"
          />
        </Col>
      </Row>
    </Wrapper>
  );
};

export default Content;
