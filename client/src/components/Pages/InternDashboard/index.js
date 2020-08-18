import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spin } from 'antd';
import { Elements } from 'react-stripe-elements';

import { Row, Col } from '../../Common/Grid';
import * as T from '../../Common/Typography';
import { BookingCards } from '../../Common/Cards';
import CompleteProfilePrompt from '../../Common/CompleteProfilePrompt';
import { Updates, Payments, Reviews, Community } from '../../Common/Section';
import PayNowModal from '../../Common/PayNowModal';

import { API_INTERN_DASHBOARD_URL } from '../../../constants/apiRoutes';
import { INTERN_SIGNUP_ABOUT_ME } from '../../../constants/navRoutes';
import { TABLET_WIDTH } from '../../../constants/screenWidths';
import { bottomMargins, typographies } from './styleProperties';
import { colors } from '../../../theme';
import { formatPrice, decidePaymentStatus } from '../../../helpers';
import { PageWrapper } from './InternDashboard.style';

const initState = {
  name: '',
  installments: [],
  paymentsHistory: [],
  notifications: [],
  reviews: [],
};

const updatedPayments = arr =>
  arr.map(el => {
    const {
      _id,
      booking,
      createdAt,
      host,
      intern,
      transaction,
      dueDate,
      amount,
    } = el;

    return {
      _id,
      dueDate,
      status: transaction ? 'paid' : decidePaymentStatus(dueDate),
      amount: formatPrice(amount),
      booking,
      intern,
      host,
      transaction,
      createdAt,
    };
  });

const InternDashboard = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({ ...initState });
  const [payNow, setPayNow] = useState({ openModal: false, installment: {} });
  const { windowWidth, role } = props;

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(API_INTERN_DASHBOARD_URL);
      setIsLoading(false);
      const {
        name = '',
        notifications = [],
        nextBooking = {},
        reviews = [],
        installments = [],
        profileCompleted = false,
        paymentsHistory = [],
      } = data;

      setState({
        name,
        notifications,
        nextBooking,
        reviews,
        installments,
        paymentsHistory,
        profileCompleted,
      });
    } catch (err) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const {
    notifications,
    name,
    installments,
    paymentsHistory,
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
    <PageWrapper mobile={device === 'mobile'}>
      <Elements>
        <PayNowModal
          payNow={payNow}
          setPayNow={setPayNow}
          fetchData={fetchData}
        />
      </Elements>
      <Row mb={3}>
        <Col w={[4, 12, 12]}>
          <HeaderTitle color="blue">
            Welcome{device !== 'mobile' && ' back'}, {firstName}!
          </HeaderTitle>
        </Col>
      </Row>
      <Row mb={device !== 'mobile' ? 7 : 6}>
        {!profileCompleted && (
          <Col w={[4, 12, 12]}>
            <CompleteProfilePrompt
              device={device}
              url={INTERN_SIGNUP_ABOUT_ME}
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
          {nextBooking && Object.keys(nextBooking).length > 0 ? (
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
              interests={
                nextBooking.withUserInterestsIntern &&
                nextBooking.withUserInterestsIntern.length > 0
                  ? nextBooking.withUserInterestsIntern
                  : nextBooking.withUserInterestsHost
              }
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
        <Col w={[4, 10, 8]} mb={bottomMargins.col[device]}>
          <Payments
            handleClick={rowData =>
              setPayNow({ openModal: true, installment: rowData.installment })
            }
            payments={
              installments && installments.length > 0
                ? updatedPayments(installments)
                : updatedPayments(paymentsHistory)
            }
          />
        </Col>
      </Row>

      <Row mb={bottomMargins.row[device]}>
        {device === 'mobile' ? (
          <>
            <Col w={[4, 10, 7]} mb={bottomMargins.col[device]}>
              <Community />
            </Col>{' '}
            <Col w={[4, 10, 5]} mb={bottomMargins.col[device]}>
              <Reviews reviews={reviews} />
            </Col>
          </>
        ) : (
          <>
            <Col w={[4, 10, 5]} mb={bottomMargins.col[device]}>
              <Reviews reviews={reviews} />
            </Col>
            <Col w={[4, 10, 7]} mb={bottomMargins.col[device]}>
              <Community />
            </Col>
          </>
        )}
      </Row>
    </PageWrapper>
  );
};

export default InternDashboard;
