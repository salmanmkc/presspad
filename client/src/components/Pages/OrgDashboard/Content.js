import React, { useState } from 'react';

import { Row, Col } from '../../Common/Grid';

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
    accountDetails = {},
    internshipOpportunities = [],
    windowWidth,
    coupons = [],
    markAsSeen,
  } = props;

  const [liveCouponsSrc, setLiveCouponsSrc] = useState(true);

  const firstName = name.split(' ')[0];
  const device = windowWidth < TABLET_WIDTH ? 'mobile' : 'desktop';
  const HeaderTitle = typographies.headerTitle[device];

  const { currentBalance = 0 } = account;
  const liveCoupons = getLiveCoupons(coupons);
  const previousCoupons = getPreviousCoupons(coupons);
  const currentlyHosted = getCurrentlyHosted(coupons);
  const totalInternsSupported = getTotalInternsSupported(coupons);
  const internOpps = internshipOpportunities.map(el => el.opportunity);

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
        {accountDetails && (
          <Col w={[4, 12, 5]}>
            <Container>
              <AccountDetails
                firstName={accountDetails.firstName}
                lastName={accountDetails.lastName}
                email={accountDetails.email}
                phone={accountDetails.phone}
              />
            </Container>
          </Col>
        )}
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
          <Col w={[4, 6, 5]} mb={bottomMargins.col[device]}>
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
        {internshipOpportunities && (
          <Col w={[4, 12, 5]}>
            <Container>
              <InternshipDetails internOpps={internOpps} />
            </Container>
          </Col>
        )}
        <Col w={[4, 12, 7]}>
          <Community />
        </Col>
      </Row>
    </Wrapper>
  );
};

export default Content;
