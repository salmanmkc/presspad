import React from 'react';

import { Row, Col } from '../../Common/Grid';
import * as T from '../../Common/Typography';
import { MyAccount, AccountDetails, Updates } from '../../Common/Section';

import { TABLET_WIDTH } from '../../../constants/screenWidths';

import { bottomMargins, typographies } from './styleProperties';

import { Wrapper } from './OrgDashboard.style';

const Content = props => {
  const {
    name = '',
    orgName = '',
    updates,
    state,
    windowWidth,
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

  // console.log('props', props);

  const firstName = name.split(' ')[0];
  const device = windowWidth < TABLET_WIDTH ? 'mobile' : 'desktop';
  const HeaderTitle = typographies.headerTitle[device];

  const SectionTitle = typographies.sectionTitle[device];

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
        <Col w={[4, 10, 7]} mb={bottomMargins.col[device]}>
          <MyAccount
            funds={4400}
            liveCodes={3}
            liveCodesCost={600}
            liveBookings={1}
            // addFunds={addFunds}
            // addCodes={addCodes}
          />
        </Col>
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
        <Col w={[4, 10, 5]} mb={bottomMargins.col[device]}>
          CURRENT INTERN DISCOUNT CODES
        </Col>
      </Row>
      <Row mb={bottomMargins.row[device]}>
        <Col w={[4, 10, 4]} mb={bottomMargins.col[device]}>
          <Updates updates={updates} />
        </Col>
      </Row>
    </Wrapper>
  );
};

export default Content;
