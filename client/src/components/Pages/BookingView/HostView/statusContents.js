import React from 'react';
import { Spin } from 'antd';

import { H4C, H6C, H5C, P } from '../../../Common/Typography';
import ButtonNew from '../../../Common/ButtonNew';
import { getStringTime } from '../../../../helpers';

import LeaveReview from '../LeaveReview';

import {
  ButtonsWrapper,
  Error,
  ProfileLink,
  FireWorksImg,
} from './HostView.style';

import { INTERN_PROFILE } from '../../../../constants/navRoutes';
import fireworks from '../../../../assets/fireworks.png';

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
    <H4C>
      booking details
      <FireWorksImg src={fireworks} />
    </H4C>
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
    <P mt="2" mb="5">
      <ProfileLink to={INTERN_PROFILE.replace(':id', internId)}>
        {internName}
      </ProfileLink>
      ’s stay with you is now complete. Thank you again for helping support our
      PressPad community! Any earnings you made can now be withdrawn from your
      account or donated to PressPad.
    </P>
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
