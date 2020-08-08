import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import * as S from '../style';

import { Row, Col } from '../../Grid';
import * as T from '../../Typography';

import { Badge, BlueSpan } from '../../general';
import LoadingBallPulseSync from '../../LoadingBallPulseSync';

const timeCol = [1, 2, 4];
const updateCol = [3, 8, 8];

const Update = ({ item, userRole }) => {
  const {
    type,
    secondParty,
    createdAt,
    seen,
    booking,
    loading,
    seenForOrg = false,
    user = {},
  } = item;

  const timeString = createdAt ? moment(createdAt).format('DD MMM YY') : 'N/A';

  switch (userRole) {
    case 'intern':
      switch (type) {
        case 'stayRejected':
          return (
            <S.UpdateLink to={`/booking/${booking}`}>
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
            </S.UpdateLink>
          );

        case 'stayApproved':
          return (
            <S.UpdateLink to={`/booking/${booking}`}>
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
            </S.UpdateLink>
          );

        case 'stayCompleted':
          return (
            <S.UpdateLink to={`/booking/${booking}`}>
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
            </S.UpdateLink>
          );

        case 'completeProfileRemind':
          return (
            <S.UpdateLink to="/my-profile">
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
            </S.UpdateLink>
          );

        case 'getReview':
          return (
            <S.UpdateLink to={`/booking/${booking}`}>
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
            </S.UpdateLink>
          );

        case 'giveReviewReminder':
          return (
            <S.UpdateLink to={`/review-info/${booking}`}>
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
            </S.UpdateLink>
          );

        case 'cancelledBeforePayments':
          return (
            <S.UpdateLink to={`/booking/${booking}`}>
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
            </S.UpdateLink>
          );

        case 'requestCancelAfterPayments':
          return (
            <S.UpdateLink to={`/booking/${booking}`}>
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
            </S.UpdateLink>
          );

        case 'cancelledAfterPayments':
          return (
            <S.UpdateLink to={`/booking/${booking}`}>
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
            </S.UpdateLink>
          );

        case 'paymentIsDue':
          return (
            <S.UpdateLink to={`/booking/${booking}`}>
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
            </S.UpdateLink>
          );

        case 'paymentOverDue':
          return (
            <S.UpdateLink to={`/booking/${booking}`}>
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
            </S.UpdateLink>
          );

        case 'bookingTerminated':
          return (
            <S.UpdateLink to={`/booking/${booking}`}>
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
            </S.UpdateLink>
          );

        default:
          return null;
      }
    case 'host':
      switch (type) {
        case 'stayRequest':
          return (
            <S.UpdateLink to={`/booking/${booking}`}>
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
            </S.UpdateLink>
          );

        case 'stayCompleted':
          return (
            <S.UpdateLink to={`/booking/${booking}`}>
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
            </S.UpdateLink>
          );

        case 'completeProfileRemind':
          return (
            <S.UpdateLink to="/my-profile">
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
            </S.UpdateLink>
          );

        case 'getReview':
          return (
            <S.UpdateLink to={`/booking/${booking}`}>
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
            </S.UpdateLink>
          );

        case 'giveReviewReminder':
          return (
            <S.UpdateLink to={`/review-info/${booking}`}>
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
            </S.UpdateLink>
          );

        case 'cancelledBeforePayments':
          return (
            <S.UpdateLink to={`/booking/${booking}`}>
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
            </S.UpdateLink>
          );

        case 'requestCancelAfterPayments':
          return (
            <S.UpdateLink to={`/booking/${booking}`}>
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
            </S.UpdateLink>
          );

        case 'cancelledAfterPayments':
          return (
            <S.UpdateLink to={`/booking/${booking}`}>
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
            </S.UpdateLink>
          );

        case 'paymentIsDue':
          return (
            <S.UpdateLink to={`/booking/${booking}`}>
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
            </S.UpdateLink>
          );

        case 'paymentOverDue':
          return (
            <S.UpdateLink to={`/booking/${booking}`}>
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
            </S.UpdateLink>
          );

        case 'bookingTerminated':
          return (
            <S.UpdateLink to={`/booking/${booking}`}>
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
            </S.UpdateLink>
          );

        default:
          return null;
      }
    case 'org':
      switch (type) {
        case 'stayApproved':
          return (
            <Row mb={3}>
              <Col w={timeCol}>
                <T.PXS>
                  <i>{timeString}</i>
                </T.PXS>
              </Col>
              <Col w={updateCol}>
                <T.PXS>
                  {user.name} has matched with
                  <Link to={`/host/${secondParty._id}`}>
                    <BlueSpan> {secondParty.name}</BlueSpan>
                  </Link>
                </T.PXS>

                {!seenForOrg && !loading && <Badge>new</Badge>}
                {loading && !seenForOrg && <LoadingBallPulseSync />}
              </Col>
            </Row>
          );

        case 'getReview':
          return (
            <Row mb={3}>
              <Col w={timeCol}>
                <T.PXS>
                  <i>{timeString}</i>
                </T.PXS>
              </Col>

              <Col w={updateCol}>
                <T.PXS>{user.name} has received a new review</T.PXS>
                {!seenForOrg && !loading && <Badge>new</Badge>}
                {loading && !seenForOrg && <LoadingBallPulseSync />}
              </Col>
            </Row>
          );

        case 'stayCompleted':
          return (
            <Row mb={3}>
              <Col w={timeCol}>
                <T.PXS>
                  <i>{timeString}</i>
                </T.PXS>
              </Col>

              <Col w={updateCol}>
                <T.PXS>{user.name} has completed their stay </T.PXS>
                {!seenForOrg && !loading && <Badge>new</Badge>}
                {loading && !seenForOrg && <LoadingBallPulseSync />}
              </Col>
            </Row>
          );

        case 'bookingTerminated':
          return (
            <Row mb={3}>
              <Col w={timeCol}>
                <T.PXS>
                  <i>{timeString}</i>
                </T.PXS>
              </Col>

              <Col w={updateCol}>
                <T.PXS>
                  Unfortunately due to lack of payment this booking has been
                  terminated.{' '}
                </T.PXS>
                {!seenForOrg && !loading && <Badge>new</Badge>}
                {loading && !seenForOrg && <LoadingBallPulseSync />}
              </Col>
            </Row>
          );
        default:
          return null;
      }

    default:
      return null;
  }
};

export default Update;
