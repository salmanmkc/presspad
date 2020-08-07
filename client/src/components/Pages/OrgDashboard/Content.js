import React from 'react';

import { Row, Col } from '../../Common/Grid';
import * as T from '../../Common/Typography';

import { TABLET_WIDTH } from '../../../constants/screenWidths';

import { bottomMargins, typographies } from './styleProperties';

import { Wrapper } from './OrgDashboard.style';

const Content = props => {
  const {
    name = '',
    orgName = '',
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

  console.log('props', props);

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
    </Wrapper>
  );
};

export default Content;
