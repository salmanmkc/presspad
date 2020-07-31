import React from 'react';
import moment from 'moment';

import { Link } from 'react-router-dom';
import { UpdatesContainer, DateWrapper, ContentWrapper } from './update.style';
import { Badge, UpdateItem, BlueSpan, UpdateDate } from '../general';
import LoadingBallPulseSync from '../LoadingBallPulseSync';
import * as T from '../Typography';

import { getStringTime } from '../../../helpers';

const Update = ({ item, userRole }) => {
  const { type, secondParty, createdAt, seen, booking, loading } = item;

  const timeString = getStringTime(createdAt);
  switch (userRole) {
    case 'intern':
      switch (type) {
        case 'stayRejected':
          return (
            <UpdateItem>
              Your request to stay with&nbsp;
              <Link to={`/hosts/${secondParty._id}`}>
                <BlueSpan>{secondParty.name}</BlueSpan>
              </Link>
              &nbsp; has been rejected - <UpdateDate>{timeString}</UpdateDate>
              {!seen && !loading && <Badge>new</Badge>}
              {loading && !seen && <LoadingBallPulseSync />}
            </UpdateItem>
          );

        case 'stayApproved':
          return (
            <UpdateItem>
              Your request to stay with&nbsp;
              <Link to={`/hosts/${secondParty._id}`}>
                <BlueSpan>{secondParty.name}</BlueSpan>
              </Link>
              &nbsp; has been approved - <UpdateDate>{timeString}</UpdateDate>
              {!seen && !loading && <Badge>new</Badge>}
              {loading && !seen && <LoadingBallPulseSync />}
            </UpdateItem>
          );

        case 'stayCompleted':
          return (
            <UpdateItem>
              Your stay with&nbsp;
              <Link to={`/hosts/${secondParty._id}`}>
                <BlueSpan>{secondParty.name}</BlueSpan>
              </Link>
              &nbsp;has been completed - <UpdateDate>{timeString}</UpdateDate>
              {!seen && !loading && <Badge>new</Badge>}
              {loading && !seen && <LoadingBallPulseSync />}
            </UpdateItem>
          );

        case 'completeProfileRemind':
          return (
            <Link to="/my-profile">
              <UpdateItem>
                You’re so close to completing your profile! Just add a few more
                fields - <UpdateDate>{timeString}</UpdateDate>
                {!seen && !loading && <Badge>new</Badge>}
                {loading && !seen && <LoadingBallPulseSync />}
              </UpdateItem>
            </Link>
          );

        case 'getReview':
          return (
            <Link to={`/booking/${booking}`}>
              <UpdateItem>
                You have received a new review from&nbsp;
                <BlueSpan>{secondParty.name}</BlueSpan> -&nbsp;
                <UpdateDate>{timeString}</UpdateDate>
                {!seen && !loading && <Badge>new</Badge>}
                {loading && !seen && <LoadingBallPulseSync />}
              </UpdateItem>
            </Link>
          );

        case 'giveReviewReminder':
          return (
            <Link to={`/review-info/${booking}`}>
              <UpdateItem>
                Please leave a review for&nbsp;
                <BlueSpan>{secondParty.name}</BlueSpan>&nbsp; -&nbsp;
                <UpdateDate>{timeString}</UpdateDate>
                {!seen && !loading && <Badge>new</Badge>}
                {loading && !seen && <LoadingBallPulseSync />}
              </UpdateItem>
            </Link>
          );

        default:
          return null;
      }

    // UPDATED TO MATCH S3 WIREFRAMES
    case 'host':
      switch (type) {
        case 'stayRequest':
          return (
            <UpdatesContainer>
              <DateWrapper>
                <T.PXS style={{ fontStyle: 'italic' }}>
                  {moment(createdAt).format('DD MMM YY')}
                </T.PXS>
              </DateWrapper>
              <ContentWrapper>
                <Link to={`/interns/${secondParty._id}`}>
                  <T.PXSBold>{secondParty.name}</T.PXSBold>
                </Link>
                <T.PXS>requested to stay with you</T.PXS>
              </ContentWrapper>
              {loading && !seen && <LoadingBallPulseSync />}
            </UpdatesContainer>
          );

        case 'stayCompleted':
          return (
            <UpdatesContainer>
              <DateWrapper>
                <T.PXS style={{ fontStyle: 'italic' }}>
                  {moment(createdAt).format('DD MMM YY')}
                </T.PXS>
              </DateWrapper>
              <ContentWrapper>
                <Link to={`/interns/${secondParty._id}`}>
                  <T.PXSBold>{secondParty.name}</T.PXSBold>
                </Link>
                <T.PXS>has completed their stay with you</T.PXS>
              </ContentWrapper>
              {loading && !seen && <LoadingBallPulseSync />}
            </UpdatesContainer>
          );

        case 'completeProfileRemind':
          return (
            <UpdatesContainer>
              <DateWrapper>
                <T.PXS style={{ fontStyle: 'italic' }}>
                  {moment(createdAt).format('DD MMM YY')}
                </T.PXS>
              </DateWrapper>
              <ContentWrapper>
                <Link to="/my-profile">
                  <T.PXS>
                    You’re so close to completing your profile! Just add a few
                    more fields
                  </T.PXS>
                </Link>
              </ContentWrapper>
              {loading && !seen && <LoadingBallPulseSync />}
            </UpdatesContainer>
          );

        case 'getReview':
          return (
            <UpdatesContainer>
              <DateWrapper>
                <T.PXS style={{ fontStyle: 'italic' }}>
                  {moment(createdAt).format('DD MMM YY')}
                </T.PXS>
              </DateWrapper>
              <ContentWrapper>
                <Link to={`/booking/${booking}`}>
                  <T.PXS>
                    You have received a new review from{' '}
                    {<strong>{secondParty.name}</strong>}
                  </T.PXS>
                </Link>
              </ContentWrapper>
              {loading && !seen && <LoadingBallPulseSync />}
            </UpdatesContainer>
          );

        case 'giveReviewReminder':
          return (
            <UpdatesContainer>
              <DateWrapper>
                <T.PXS style={{ fontStyle: 'italic' }}>
                  {moment(createdAt).format('DD MMM YY')}
                </T.PXS>
              </DateWrapper>
              <ContentWrapper>
                <Link to={`/review-info/${booking}`}>
                  <T.PXS>
                    Please leave a review for{' '}
                    {<strong>{secondParty.name}</strong>}
                  </T.PXS>
                </Link>
              </ContentWrapper>
              {loading && !seen && <LoadingBallPulseSync />}
            </UpdatesContainer>
          );

        default:
          return null;
      }

    default:
      return null;
  }
};

export default Update;
