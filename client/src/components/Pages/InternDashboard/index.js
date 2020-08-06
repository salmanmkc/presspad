import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spin } from 'antd';

import { Row, Col } from '../../Common/Grid';
import * as T from '../../Common/Typography';
import { BookingCards } from '../../Common/Cards';
import CompleteProfilePrompt from '../../Common/CompleteProfilePrompt';

import PaymentsSection from './PaymentsSection';
import { PageWrapper } from '../../Common/general';

import { Updates } from '../../Common/Section';

import { API_INTERN_DASHBOARD_URL } from '../../../constants/apiRoutes';
import { INTERN_COMPLETE_PROFILE_URL } from '../../../constants/navRoutes';
import { TABLET_WIDTH } from '../../../constants/screenWidths';
import { bottomMargins, typographies } from './styleProperties';
import { colors } from '../../../theme';

const initState = {
  name: '',
  installments: [],
  notifications: [],
  reviews: [],
};

const InternDashboard = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({ ...initState });
  const { windowWidth, role } = props;

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      const { data } = await axios.get(API_INTERN_DASHBOARD_URL);

      const {
        name = '',
        notifications = [],
        nextBooking = {},
        reviews = [],
        installments = [],
        profileCompleted = false,
      } = data;

      setState({
        name,
        notifications,
        nextBooking,
        reviews,
        installments,
        profileCompleted,
      });
    };

    fetchData();
    setIsLoading(false);
  }, []);

  const {
    notifications,
    name,
    installments,
    nextBooking,
    reviews,
    profileCompleted,
  } = state;

  const firstName = name.split(' ')[0];
  const device = windowWidth < TABLET_WIDTH ? 'mobile' : 'desktop';
  const HeaderTitle = typographies.headerTitle[device];
  const SectionTitle = typographies.sectionTitle[device];

  if (isLoading) return <Spin />;

  return (
    <PageWrapper>
      <Row mb={5}>
        <Col w={[4, 12, 12]}>
          <HeaderTitle color="blue">
            Welcome{device !== 'mobile' && ' back'}, {firstName}!
          </HeaderTitle>
        </Col>
        {!profileCompleted && (
          <Col w={[4, 12, 12]}>
            <CompleteProfilePrompt
              device={device}
              url={INTERN_COMPLETE_PROFILE_URL}
            />
          </Col>
        )}
      </Row>
      {/* NEXT BOOKING */}
      <Row mb={bottomMargins.row[device]}>
        <Col w={[4, 10, 8]} mb={bottomMargins.col[device]}>
          <SectionTitle
            style={{ marginBottom: bottomMargins.sectionTitle[device] }}
          >
            Upcoming Booking
          </SectionTitle>
          {nextBooking ? (
            <BookingCards
              width="100%"
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
        </Col>
      </Row>
      <Row mb={bottomMargins.row[device]}>
        <Col w={[4, 10, 4]} mb={bottomMargins.col[device]}>
          <Updates updates={notifications} userRole="intern" />
        </Col>
      </Row>
      {/*
        <Updates updates={notifications} userRole="intern" />
        <BookingsTableSection data={bookings} windowWidth={windowWidth} />
        <PaymentsSection data={installments} /> */}
    </PageWrapper>
  );
};

export default InternDashboard;
