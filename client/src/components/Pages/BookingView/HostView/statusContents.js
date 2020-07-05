import React from 'react';
import { useHistory } from 'react-router-dom';
import { Spin } from 'antd';
import moment from 'moment';

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

import {
  INTERN_PROFILE,
  DASHBOARD_URL,
  MYPROFILE_URL,
} from '../../../../constants/navRoutes';
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
    <T.H4C>booking request</T.H4C>
    <T.H6C mt="5">
      Booking request made on {madeAt} <span>[{getStringTime(createdAt)}]</span>
    </T.H6C>
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
    <T.H4C>booking request</T.H4C>
    <T.H6C mb="2" mt="4" color="lightGray">
      status
    </T.H6C>
    <T.H5C color="blue">
      PENDING - Awaiting deposit from {internName.split(' ')[0]}
    </T.H5C>
  </>
);
const ConfirmedContent = ({ bookingInfo }) => {
  const { installments } = bookingInfo;
  const firstUnpaidInstallment = getFirstUnpaidInstallment(installments);

  let status = 'confirmed';
  let statusColor = 'blue';
  let subTitle;
  if (
    firstUnpaidInstallment &&
    moment().isSameOrAfter(firstUnpaidInstallment.dueDate, 'day')
  ) {
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
      <T.H4C>
        booking details
        {!subTitle && <FireWorksImg src={fireworks} />}
      </T.H4C>
      <T.H6C mb="2" mt="4" color="lightGray">
        status
      </T.H6C>
      <T.H5C color={statusColor}>{status}</T.H5C>
      {subTitle && <T.P>{subTitle}</T.P>}
    </>
  );
};

const RejectedContent = () => (
  <>
    <T.H4C>booking details</T.H4C>
    <T.H6C mb="2" mt="4" color="lightGray">
      status
    </T.H6C>
    <T.H5C color="pink">rejected</T.H5C>
  </>
);

const AwaitingCancellationContent = () => {
  const history = useHistory();
  return (
    <>
      <T.P mt="5" mb="1">
        Thank you for your request. At PressPad we take booking cancellations
        very seriously. Our team will be looking at this and will be in touch to
        personally resolve the issue as soon as possible.
      </T.P>

      <ButtonNew
        small
        type="primary"
        mt="4"
        onClick={() => history.push(DASHBOARD_URL)}
      >
        go to dashboard
      </ButtonNew>
    </>
  );
};

const CancelledContent = ({
  internName,
  cancellingUserMessage,
  cancelledByHost,
}) => {
  const history = useHistory();
  return (
    <>
      {cancelledByHost ? (
        <T.P mt="5" mb="1">
          {internName}’s stay with you has been successfully cancelled.
          <br /> <br />
          If you had to cancel due to no longer being available on the dates
          listed in your profile, please make sure you{' '}
          <T.Link to={MYPROFILE_URL}> update your listing now</T.Link>.
        </T.P>
      ) : (
        <T.P mt="5" mb="1">
          Sorry, your booking with {internName} has been cancelled. You will not
          be charged anything for this booking. Here is the reason they
          provided: <br /> <br /> {cancellingUserMessage}
        </T.P>
      )}
      <ButtonNew
        small
        type="primary"
        mt="4"
        onClick={() => history.push(DASHBOARD_URL)}
      >
        go to dashboard
      </ButtonNew>
    </>
  );
};

const CancelledAfterPaymentContent = ({ internName }) => {
  const history = useHistory();

  return (
    <>
      <T.P mt="5" mb="1">
        Your booking with {internName} has been successfully cancelled.
      </T.P>
      <T.P mt="5" mb="1">
        You should have been contacted by a member of our PressPad team who will
        have advised you on next steps. If this has not happened, please{' '}
        <a href="mailto:urgent@presspad.co.uk">contact us</a>.
      </T.P>
      <ButtonNew
        small
        type="primary"
        mt="4"
        onClick={() => history.push(DASHBOARD_URL)}
      >
        go to dashboard
      </ButtonNew>
    </>
  );
};

const CompletedContent = ({
  internId,
  internName,
  reviews,
  bookingId,
  userId,
  isLoading,
}) => (
  <>
    <T.H4C>booking details</T.H4C>
    <T.H6C mb="2" mt="4" color="lightGray">
      status
    </T.H6C>
    <T.H5C color="pink">complete</T.H5C>
    <T.P mt="2" mb="5">
      <ProfileLink to={INTERN_PROFILE.replace(':id', internId)}>
        {internName}
      </ProfileLink>
      ’s stay with you is now complete. Thank you again for helping support our
      PressPad community! Any earnings you made can now be withdrawn from your
      account or donated to PressPad.
    </T.P>
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
  CancelledContent,
  AwaitingCancellationContent,
  CancelledAfterPaymentContent,
};
