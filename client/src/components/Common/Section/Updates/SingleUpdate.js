import React from 'react';
import { Link } from 'react-router-dom';

import * as S from '../style';

import { Row, Col } from '../../Grid';

import { Badge, BlueSpan } from '../../general';
import LoadingBallPulseSync from '../../LoadingBallPulseSync';

import { createSingleUpdateDate } from '../../../../helpers';

const timeCol = [1, 2, 4];
const updateCol = [3, 8, 8];

const Update = ({ item, userRole }) => {
  const { type, secondParty, createdAt, seen, booking, loading } = item;

  const timeString = createSingleUpdateDate(createdAt);

  switch (userRole) {
    case 'intern':
      switch (type) {
        case 'stayRejected':
          return (
            <S.StyledLink to={`/booking/${booking}`}>
              <Row mb={3}>
                <Col w={timeCol}>
                  <i>{timeString}</i>
                </Col>
                <Col w={updateCol}>
                  Your request to stay with&nbsp;
                  <Link to={`/hosts/${secondParty._id}`}>
                    <BlueSpan>{secondParty.name}</BlueSpan>
                  </Link>
                  &nbsp;has been rejected
                  {!seen && !loading && <Badge>new</Badge>}
                  {loading && !seen && <LoadingBallPulseSync />}
                </Col>
              </Row>
            </S.StyledLink>
          );

        case 'stayApproved':
          return (
            <S.StyledLink to={`/booking/${booking}`}>
              <Row mb={3}>
                <Col w={timeCol}>
                  <i>{timeString}</i>
                </Col>
                <Col w={updateCol}>
                  Your request to stay with&nbsp;
                  <Link to={`/hosts/${secondParty._id}`}>
                    <BlueSpan>{secondParty.name}</BlueSpan>
                  </Link>
                  &nbsp; has been approved
                  {!seen && !loading && <Badge>new</Badge>}
                  {loading && !seen && <LoadingBallPulseSync />}
                </Col>
              </Row>
            </S.StyledLink>
          );

        case 'stayCompleted':
          return (
            <S.StyledLink to={`/booking/${booking}`}>
              <Row mb={3}>
                <Col w={timeCol}>
                  <i>{timeString}</i>
                </Col>
                <Col w={updateCol}>
                  Your stay with&nbsp;
                  <Link to={`/hosts/${secondParty._id}`}>
                    <BlueSpan>{secondParty.name}</BlueSpan>
                  </Link>
                  &nbsp;has been completed
                  {!seen && !loading && <Badge>new</Badge>}
                  {loading && !seen && <LoadingBallPulseSync />}
                </Col>
              </Row>
            </S.StyledLink>
          );

        case 'completeProfileRemind':
          return (
            <S.StyledLink to="/my-profile">
              <Row mb={3}>
                <Col w={timeCol}>
                  <i>{timeString}</i>
                </Col>
                <Col w={updateCol}>
                  You’re so close to completing your profile! Just add a few
                  more fields
                  {!seen && !loading && <Badge>new</Badge>}
                  {loading && !seen && <LoadingBallPulseSync />}
                </Col>
              </Row>
            </S.StyledLink>
          );

        case 'getReview':
          return (
            <S.StyledLink to={`/booking/${booking}`}>
              <Row mb={3}>
                <Col w={timeCol}>
                  <i>{timeString}</i>
                </Col>
                <Col w={updateCol}>
                  You have received a new review from&nbsp;
                  <BlueSpan>{secondParty.name}</BlueSpan>
                  {!seen && !loading && <Badge>new</Badge>}
                  {loading && !seen && <LoadingBallPulseSync />}
                </Col>
              </Row>
            </S.StyledLink>
          );

        case 'giveReviewReminder':
          return (
            <S.StyledLink to={`/review-info/${booking}`}>
              <Row mb={3}>
                <Col w={timeCol}>
                  <i>{timeString}</i>
                </Col>
                <Col w={updateCol}>
                  Please leave a review for&nbsp;
                  <BlueSpan>{secondParty.name}</BlueSpan>
                  {!seen && !loading && <Badge>new</Badge>}
                  {loading && !seen && <LoadingBallPulseSync />}
                </Col>
              </Row>
            </S.StyledLink>
          );

        case 'cancelledBeforePayments':
          return (
            <S.StyledLink to={`/booking/${booking}`}>
              <Row mb={3}>
                <Col w={timeCol}>
                  <i>{timeString}</i>
                </Col>
                <Col w={updateCol}>
                  Booking with&nbsp;
                  <BlueSpan>{secondParty.name}</BlueSpan>&nbsp;cancelled. View
                  booking
                  {!seen && !loading && <Badge>new</Badge>}
                  {loading && !seen && <LoadingBallPulseSync />}
                </Col>
              </Row>
            </S.StyledLink>
          );

        case 'requestCancelAfterPayments':
          return (
            <S.StyledLink to={`/booking/${booking}`}>
              <Row mb={3}>
                <Col w={timeCol}>
                  <i>{timeString}</i>
                </Col>
                <Col w={updateCol}>
                  Cancel request received. We are reviewing your request now.
                  View booking
                  {!seen && !loading && <Badge>new</Badge>}
                  {loading && !seen && <LoadingBallPulseSync />}
                </Col>
              </Row>
            </S.StyledLink>
          );

        case 'cancelledAfterPayments':
          return (
            <S.StyledLink to={`/booking/${booking}`}>
              <Row mb={3}>
                <Col w={timeCol}>
                  <i>{timeString}</i>
                </Col>
                <Col w={updateCol}>
                  Booking with&nbsp;
                  <BlueSpan>{secondParty.name}</BlueSpan>&nbsp;cancelled. View
                  booking
                  {!seen && !loading && <Badge>new</Badge>}
                  {loading && !seen && <LoadingBallPulseSync />}
                </Col>
              </Row>
            </S.StyledLink>
          );

        case 'paymentIsDue':
          return (
            <S.StyledLink to={`/booking/${booking}`}>
              <Row mb={3}>
                <Col w={timeCol}>
                  <i>{timeString}</i>
                </Col>
                <Col w={updateCol}>
                  Payment with&nbsp;
                  <BlueSpan>{secondParty.name}</BlueSpan>&nbsp;is due. Pay here
                  {!seen && !loading && <Badge>new</Badge>}
                  {loading && !seen && <LoadingBallPulseSync />}
                </Col>
              </Row>
            </S.StyledLink>
          );

        case 'paymentOverDue':
          return (
            <S.StyledLink to={`/booking/${booking}`}>
              <Row mb={3}>
                <Col w={timeCol}>
                  <i>{timeString}</i>
                </Col>
                <Col w={updateCol}>
                  URGENT! Payment with&nbsp;
                  <BlueSpan>{secondParty.name}</BlueSpan>&nbsp;is now 7 days
                  overdue. Pay here to avoid your stay being terminated
                  {!seen && !loading && <Badge>new</Badge>}
                  {loading && !seen && <LoadingBallPulseSync />}
                </Col>
              </Row>
            </S.StyledLink>
          );

        case 'bookingTerminated':
          return (
            <S.StyledLink to={`/booking/${booking}`}>
              <Row mb={3}>
                <Col w={timeCol}>
                  <i>{timeString}</i>
                </Col>
                <Col w={updateCol}>
                  Unfortunately due to lack of payment this booking has been
                  terminated. View booking
                  {!seen && !loading && <Badge>new</Badge>}
                  {loading && !seen && <LoadingBallPulseSync />}
                </Col>
              </Row>
            </S.StyledLink>
          );

        default:
          return null;
      }
    case 'host':
      switch (type) {
        case 'stayRequest':
          return (
            <S.StyledLink to={`/booking/${booking}`}>
              <Row mb={3}>
                <Col w={timeCol}>
                  <i>{timeString}</i>
                </Col>
                <Col w={updateCol}>
                  <Link to={`/interns/${secondParty._id}`}>
                    <BlueSpan>{secondParty.name}</BlueSpan>
                  </Link>{' '}
                  &nbsp;requested to stay with you
                  {!seen && !loading && <Badge>new</Badge>}
                  {loading && !seen && <LoadingBallPulseSync />}
                </Col>
              </Row>
            </S.StyledLink>
          );

        case 'stayCompleted':
          return (
            <S.StyledLink to={`/booking/${booking}`}>
              <Row mb={3}>
                <Col w={timeCol}>
                  <i>{timeString}</i>
                </Col>
                <Col w={updateCol}>
                  <Link to={`/interns/${secondParty._id}`}>
                    <BlueSpan>{secondParty.name}</BlueSpan>
                  </Link>{' '}
                  &nbsp;has completed his stay with you
                  {!seen && !loading && <Badge>new</Badge>}
                  {loading && !seen && <LoadingBallPulseSync />}
                </Col>
              </Row>
            </S.StyledLink>
          );

        case 'completeProfileRemind':
          return (
            <S.StyledLink to="/my-profile">
              <Row mb={3}>
                <Col w={timeCol}>
                  <i>{timeString}</i>
                </Col>
                <Col w={updateCol}>
                  You’re so close to completing your profile! Just add a few
                  more fields
                  {!seen && !loading && <Badge>new</Badge>}
                  {loading && !seen && <LoadingBallPulseSync />}
                </Col>
              </Row>
            </S.StyledLink>
          );

        case 'getReview':
          return (
            <S.StyledLink to={`/booking/${booking}`}>
              <Row mb={3}>
                <Col w={timeCol}>
                  <i>{timeString}</i>
                </Col>
                <Col w={updateCol}>
                  You have received a new review from&nbsp;
                  <BlueSpan>{secondParty.name}</BlueSpan>
                  {!seen && !loading && <Badge>new</Badge>}
                  {loading && !seen && <LoadingBallPulseSync />}
                </Col>
              </Row>
            </S.StyledLink>
          );

        case 'giveReviewReminder':
          return (
            <S.StyledLink to={`/review-info/${booking}`}>
              <Row mb={3}>
                <Col w={timeCol}>
                  <i>{timeString}</i>
                </Col>
                <Col w={updateCol}>
                  Please leave a review for&nbsp;
                  <BlueSpan>{secondParty.name}</BlueSpan>&nbsp;
                  {!seen && !loading && <Badge>new</Badge>}
                  {loading && !seen && <LoadingBallPulseSync />}
                </Col>
              </Row>
            </S.StyledLink>
          );

        case 'cancelledBeforePayments':
          return (
            <S.StyledLink to={`/booking/${booking}`}>
              <Row mb={3}>
                <Col w={timeCol}>
                  <i>{timeString}</i>
                </Col>
                <Col w={updateCol}>
                  Booking with&nbsp;
                  <BlueSpan>{secondParty.name}</BlueSpan>&nbsp;cancelled. View
                  booking
                  {!seen && !loading && <Badge>new</Badge>}
                  {loading && !seen && <LoadingBallPulseSync />}
                </Col>
              </Row>
            </S.StyledLink>
          );

        case 'requestCancelAfterPayments':
          return (
            <S.StyledLink to={`/booking/${booking}`}>
              <Row mb={3}>
                <Col w={timeCol}>
                  <i>{timeString}</i>
                </Col>
                <Col w={updateCol}>
                  Cancel request received. We are reviewing your request now.
                  View booking
                  {!seen && !loading && <Badge>new</Badge>}
                  {loading && !seen && <LoadingBallPulseSync />}
                </Col>
              </Row>
            </S.StyledLink>
          );

        case 'cancelledAfterPayments':
          return (
            <S.StyledLink to={`/booking/${booking}`}>
              <Row mb={3}>
                <Col w={timeCol}>
                  <i>{timeString}</i>
                </Col>
                <Col w={updateCol}>
                  Booking with&nbsp;
                  <BlueSpan>{secondParty.name}</BlueSpan>&nbsp;cancelled. View
                  booking
                  {!seen && !loading && <Badge>new</Badge>}
                  {loading && !seen && <LoadingBallPulseSync />}
                </Col>
              </Row>
            </S.StyledLink>
          );

        case 'paymentIsDue':
          return (
            <S.StyledLink to={`/booking/${booking}`}>
              <Row mb={3}>
                <Col w={timeCol}>
                  <i>{timeString}</i>
                </Col>
                <Col w={updateCol}>
                  Payment with&nbsp;
                  <BlueSpan>{secondParty.name}</BlueSpan>&nbsp;is due. View
                  booking
                  {!seen && !loading && <Badge>new</Badge>}
                  {loading && !seen && <LoadingBallPulseSync />}
                </Col>
              </Row>
            </S.StyledLink>
          );

        case 'paymentOverDue':
          return (
            <S.StyledLink to={`/booking/${booking}`}>
              <Row mb={3}>
                <Col w={timeCol}>
                  <i>{timeString}</i>
                </Col>
                <Col w={updateCol}>
                  URGENT! Payment with&nbsp;
                  <BlueSpan>{secondParty.name}</BlueSpan>&nbsp;is now 7 days
                  overdue. View booking
                  {!seen && !loading && <Badge>new</Badge>}
                  {loading && !seen && <LoadingBallPulseSync />}
                </Col>
              </Row>
            </S.StyledLink>
          );

        case 'bookingTerminated':
          return (
            <S.StyledLink to={`/booking/${booking}`}>
              <Row mb={3}>
                <Col w={timeCol}>
                  <i>{timeString}</i>
                </Col>
                <Col w={updateCol}>
                  Unfortunately due to lack of payment this booking has been
                  terminated. View booking
                  {!seen && !loading && <Badge>new</Badge>}
                  {loading && !seen && <LoadingBallPulseSync />}
                </Col>
              </Row>
            </S.StyledLink>
          );

        default:
          return null;
      }

    default:
      return null;
  }
};

export default Update;
