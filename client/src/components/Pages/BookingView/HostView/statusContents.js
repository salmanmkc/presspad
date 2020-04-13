import React from 'react';
import { Spin } from 'antd';

import { H4C, H6C, H5C } from '../../../Common/Typography';
import ButtonNew from '../../../Common/ButtonNew';
import { getStringTime } from '../../../../helpers';

import LeaveReview from '../LeaveReview';

import {
  ButtonsWrapper,
  Error,
  // ProfileLink,
} from './HostView.style';

const PendingContent = ({
  madeAt,
  createdAt,
  handleAccept,
  handleReject,
  isLoading,
  error,
}) => (
  <>
    <H4C>booking request</H4C>
    <H6C mt="5">
      Booking request made on {madeAt} <span>[{getStringTime(createdAt)}]</span>
    </H6C>
    <ButtonsWrapper>
      <ButtonNew loading={isLoading} type="primary" onClick={handleAccept}>
        accept <span>request</span>
      </ButtonNew>
      <ButtonNew
        loading={isLoading}
        type="primary"
        outline
        onClick={handleReject}
      >
        reject <span>request</span>
      </ButtonNew>
      <Error>{error}</Error>
    </ButtonsWrapper>
  </>
);

const AcceptedContent = ({ internName }) => (
  <>
    <H4C>booking request</H4C>
    <H6C mb="2" mt="4" color="lightGray">
      status
    </H6C>
    <H5C color="blue">
      PENDING - Awaiting deposit from {internName.split(' ')[0]}
    </H5C>
  </>
);
const ConfirmedContent = () => (
  <>
    <H4C>booking details</H4C>
    <H6C mb="2" mt="4" color="lightGray">
      status
    </H6C>
    <H5C color="blue">confirmed</H5C>
  </>
);

const RejectedContent = () => (
  <>
    <H4C>booking details</H4C>
    <H6C mb="2" mt="4" color="lightGray">
      status
    </H6C>
    <H5C color="pink">rejected</H5C>
  </>
);

const CompletedContent = ({
  internId,
  internName,
  reviews,
  bookingId,
  userId,
  isLoading,
}) => (
  <>
    <H4C>booking details</H4C>
    <H6C mb="2" mt="4" color="lightGray">
      status
    </H6C>
    <H5C color="pink">complete</H5C>
    {isLoading ? (
      <Spin />
    ) : (
      <LeaveReview
        reviews={reviews}
        userId={userId}
        toId={internId}
        toName={internName}
        bookingId={bookingId}
      />
    )}
  </>
);

export {
  PendingContent,
  AcceptedContent,
  RejectedContent,
  ConfirmedContent,
  CompletedContent,
};
