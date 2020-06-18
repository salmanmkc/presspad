import React from 'react';
import { Spin } from 'antd';
import moment from 'moment';

import { H4C, H6C, H5C, P } from '../../../Common/Typography';
import * as T from '../../../Common/Typography';
import ButtonNew from '../../../Common/ButtonNew';
import { getStringTime } from '../../../../helpers';
import { getFirstUnpaidInstallment } from '../helpers';

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
  isAcceptLoading,
  isRejectLoading,
  error,
}) => (
  <>
    <H4C>booking request</H4C>
    <H6C mt="5">
      Booking request made on {madeAt} <span>[{getStringTime(createdAt)}]</span>
    </H6C>
    <ButtonsWrapper>
      <ButtonNew
        loading={isAcceptLoading}
        type="primary"
        onClick={handleAccept}
      >
        accept <span>request</span>
      </ButtonNew>
      <ButtonNew
        loading={isRejectLoading}
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
const ConfirmedContent = ({ bookingInfo }) => {
  const { installments } = bookingInfo;
  const firstUnpaidInstallment = getFirstUnpaidInstallment(installments);

  let status = 'confirmed';
  let statusColor = 'blue';
  let subTitle;
  if (moment().isSameOrAfter(firstUnpaidInstallment.dueDate, 'day')) {
    statusColor = 'pink';
    const dueToday = moment()
      .subtract(6, 'd')
      .startOf('d')
      .isSameOrBefore(moment(firstUnpaidInstallment.dueDate).startOf('d'), 'd');
    if (dueToday) {
      status = 'payment due';
      subTitle = 'The next payment from your guest is due.';
    } else {
      status = 'payment overdue!';
      subTitle =
        'The next payment from your guest is now 7 days overdue. They have 48 hours before their booking is terminated. Please speak to them  if you can to make sure everything is ok.';
    }
  }
  return (
    <>
      <H4C>
        booking details
        {!subTitle && <FireWorksImg src={fireworks} />}
      </H4C>
      <H6C mb="2" mt="4" color="lightGray">
        status
      </H6C>
      <H5C color={statusColor}>{status}</H5C>
      {subTitle && <T.P>{subTitle}</T.P>}
    </>
  );
};

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
