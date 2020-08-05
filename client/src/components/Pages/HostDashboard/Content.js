import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { Row, Col } from '../../Common/Grid';
import * as T from '../../Common/Typography';
import { BookingCards } from '../../Common/Cards';
import Update from '../../Common/Update';
import Review from '../../Common/SingleReview';
import Icon from '../../Common/Icon';
import BookingDates from '../../Common/DashboardBookingDates';
import SocialNetwork from '../../Common/SocialNetwork';

import LatestPaymentsTable from './LatestPaymentsTable';

import {
  Wrapper,
  Container,
  WalletContainer,
  WalletFooter,
  ViewLink,
  PaymentsContainer,
  CompleteProfileWrapper,
} from './HostDashboard.style';
import { bottomMargins, typographies } from './styleProperties';

import { formatPrice } from '../../../helpers';

import { TABLET_WIDTH } from '../../../constants/screenWidths';
import {
  PAYMENTS_URL,
  HOST_COMPLETE_PROFILE_URL,
} from '../../../constants/navRoutes';
import { colors } from '../../../theme';
import WalletFlower from '../../../assets/wallet-flower.svg';
import NotesPayments from '../../../assets/notes-payments.svg';

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

  const renderReviewsSection = () => (
    <Container>
      <SectionTitle
        style={{ marginBottom: bottomMargins.sectionTitle[device] }}
      >
        Recent Reviews
      </SectionTitle>
      {reviews.length > 0 ? (
        reviews.map(r => {
          const {
            rate,
            user: { name: reviewer = '' },
            message,
          } = r;

          return <Review name={reviewer} rate={rate} message={message} />;
        })
      ) : (
        <T.PXL color={colors.lightestGray}>No reviews</T.PXL>
      )}
    </Container>
  );

  return (
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
          <WalletContainer
            style={{
              marginTop: device === 'desktop' ? '3rem' : '1rem',
              marginBottom: device === 'mobile' && '2rem',
            }}
            src={WalletFlower}
          >
            <T.H7C mb={2} color="gray">
              My Wallet
            </T.H7C>
            <T.H2 mb={2}>£{formatPrice(accessibleFunds)}</T.H2>
            <T.H5 color="darkerGray">£{formatPrice(pending)} pending</T.H5>
            <WalletFooter mobile={device === 'mobile'}>
              <Link to={PAYMENTS_URL}>
                <T.H7C>View Wallet</T.H7C>
              </Link>
            </WalletFooter>
          </WalletContainer>
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
          <Container>
            <SectionTitle
              style={{ marginBottom: bottomMargins.sectionTitle[device] }}
            >
              Updates
            </SectionTitle>

            {updates.length > 0 ? (
              updates.map(item => (
                <Update item={item} key={item._id} userRole="host" />
              ))
            ) : (
              <T.PXL color={colors.lightestGray}>No updates</T.PXL>
            )}
          </Container>
        </Col>
      </Row>
      {/* REVIEWS / PAYMENTS / SOCIAL */}
      <Row mb={bottomMargins.row[device]}>
        {device !== 'mobile' && (
          <Col w={[4, 10, 5]} mb={bottomMargins.col[device]}>
            {renderReviewsSection()}
          </Col>
        )}
        <Col w={[4, 10, 7]} mb={bottomMargins.col[device]}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <PaymentsContainer src={NotesPayments}>
              <SectionTitle
                style={{
                  marginTop: '1rem',
                  marginBottom: bottomMargins.sectionTitle[device],
                }}
              >
                Recent Payments
              </SectionTitle>
              {lastPayments.length > 0 ? (
                <>
                  <LatestPaymentsTable payments={lastPayments} />
                  <Link to={PAYMENTS_URL}>
                    <ViewLink>
                      view all payments
                      <Icon
                        icon="arrow"
                        direction="right"
                        width="15px"
                        height="15px"
                      />
                    </ViewLink>
                  </Link>
                </>
              ) : (
                <T.PXL color={colors.lightestGray}>No records to show</T.PXL>
              )}
            </PaymentsContainer>
            <Container style={{ marginTop: '1rem' }}>
              <SocialNetwork mobile={device === 'mobile'} />
            </Container>
          </div>
        </Col>
        {device === 'mobile' && (
          <Col w={[4, 10, 5]} mb={bottomMargins.col[device]}>
            {renderReviewsSection()}
          </Col>
        )}
      </Row>
    </Wrapper>
  );
};

export default Content;
