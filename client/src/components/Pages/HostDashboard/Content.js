import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { Row, Col } from '../../Common/Grid';
import * as T from '../../Common/Typography';
import { BookingCards } from '../../Common/Cards';

import Icon from '../../Common/Icon';
import BookingDates from '../../Common/DashboardBookingDates';
import {
  Wallet,
  Updates,
  Reviews,
  Community,
  Payments,
} from '../../Common/Section';

import {
  Wrapper,
  Container,
  CompleteProfileWrapper,
} from './HostDashboard.style';
import { bottomMargins, typographies } from './styleProperties';

import { formatPrice } from '../../../helpers';

import { TABLET_WIDTH } from '../../../constants/screenWidths';
import { HOST_COMPLETE_PROFILE_URL } from '../../../constants/navRoutes';
import { colors } from '../../../theme';

const Content = ({
  name,
  acceptAutomatically,
  windowWidth,
  nextBooking,
  role,
  accessibleFunds,
  pending,
  updates,
  reviews,
  lastPayments,
  listingAvailableDates,
  profileCompleted,
}) => {
  const firstName = name.split(' ')[0];
  const device = windowWidth < TABLET_WIDTH ? 'mobile' : 'desktop';

  const HeaderTitle = typographies.headerTitle[device];
  const SectionTitle = typographies.sectionTitle[device];
  const CompleteProfileText = typographies.completeProfile[device];

  const createReadableDates = () =>
    listingAvailableDates.map(el => ({
      startDate: moment(el.startDate),
      endDate: moment(el.endDate),
    }));

  const updatedPayments = () =>
    lastPayments.map(el => {
      const {
        transactionDates,
        intern,
        hostInstallmentsRatioAmount,
        hostcouponTransactionsRatioAmount,
      } = el;
      return {
        date: transactionDates[transactionDates.length - 1],
        intern,
        earnings: formatPrice(
          hostcouponTransactionsRatioAmount + hostInstallmentsRatioAmount,
          2,
        ),
      };
    });

  return (
    <>
      <Wrapper mobile={device === 'mobile'}>
        {/* HEADER */}
        <Row mb={5}>
          <Col w={[4, 12, 12]}>
            <HeaderTitle color="blue">
              Welcome{device !== 'mobile' && ' back'}, {firstName}!
            </HeaderTitle>
          </Col>
          {!profileCompleted && (
            <Col w={[4, 12, 12]}>
              <CompleteProfileWrapper>
                <Icon icon="reviewExplanationMark" width="35px" height="35px" />
                <CompleteProfileText
                  style={{ marginLeft: '0.8rem' }}
                  color="darkerGray"
                >
                  Your profile is not complete. <br />
                  <Link
                    style={{
                      textDecoration: 'underline',
                      textUnderlinePosition: 'under',
                    }}
                    to={HOST_COMPLETE_PROFILE_URL}
                  >
                    Finish signing up here
                  </Link>
                  &nbsp;to start using PressPad
                </CompleteProfileText>
              </CompleteProfileWrapper>
            </Col>
          )}
        </Row>
        {/* NEXT BOOKING / WALLET */}
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
          <Col w={[4, 10, 4]}>
            <Container>
              {accessibleFunds && pending && (
                <Wallet
                  balance={accessibleFunds / 100}
                  pending={formatPrice(pending)}
                />
              )}
            </Container>
          </Col>
        </Row>
        {/* BOOKING DATES / UPDATES */}
        <Row mb={bottomMargins.row[device]}>
          <Col w={[4, 10, 8]} mb={bottomMargins.col[device]}>
            <BookingDates
              currentDates={createReadableDates()}
              autoAccept={acceptAutomatically}
            />
          </Col>
          <Col w={[4, 10, 4]} mb={bottomMargins.col[device]}>
            <Updates updates={updates} userRole="host" />
          </Col>
        </Row>
        {/* REVIEWS / PAYMENTS / SOCIAL */}
        <Row mb={bottomMargins.row[device]}>
          {device !== 'mobile' && (
            <Col w={[4, 10, 5]} mb={bottomMargins.col[device]}>
              <Reviews reviews={reviews} />
            </Col>
          )}
          <Col w={[4, 10, 7]} mb={bottomMargins.col[device]}>
            <Payments
              type="recent"
              payments={lastPayments && updatedPayments(lastPayments)}
            />

            <Container>
              <Community />
            </Container>
          </Col>
          {device === 'mobile' && (
            <Col w={[4, 10, 5]} mb={bottomMargins.col[device]}>
              <Reviews reviews={reviews} />
            </Col>
          )}
        </Row>
      </Wrapper>
    </>
  );
};

export default Content;
