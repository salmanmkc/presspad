import React from 'react';
import { useHistory } from 'react-router-dom';

import { PXSBold, P, PS, PBold, Link } from '../../../Common/Typography';
import ButtonNew from '../../../Common/ButtonNew';
import Icon from '../../../Common/Icon';

import HostInternInfo from '../HostInternInfo';
import { TipsCard } from '../../../Common/Cards';
import LeaveReview from '../LeaveReview';

import MakePayment from './MakePayment';
import ReportProblem from './ReportProblem';
import { WarningWrapper, TipsWrapper, ProfileLink } from './InternView.style';

import {
  HOST_PROFILE,
  HOSTS_URL,
  MYPROFILE_URL,
  DASHBOARD_URL,
} from '../../../../constants/navRoutes';

const ViewProfile = ({ hostId }) => {
  const history = useHistory();

  return (
    <ButtonNew
      small
      outline
      type="tertiary"
      mt="4"
      onClick={() => history.push(HOST_PROFILE.replace(':id', hostId))}
    >
      view profile
    </ButtonNew>
  );
};

const WaitingContent = ({ hostRespondingTime, hostId }) => (
  <>
    <PXSBold color="gray" mt="1">
      This host usually takes around {hostRespondingTime || 7} days to respond
    </PXSBold>
    <P mt="5" mb="1">
      Your booking request has been successfully submitted. Make sure to check
      your account for a response.
    </P>
    <ViewProfile hostId={hostId} />
  </>
);

const AcceptedContent = ({
  handlePayNowClick,
  handleConfirmWithoutPayClick,
  handlePaymentMethod,
  handleCouponChange,
  upfront,
  bookingDays,
  paymentInfo,
  price,
  startDate,
  endDate,
  couponInfo,
  usedCoupon,
  hostId,
  bursaryDiscount,
}) => (
  <>
    <ViewProfile hostId={hostId} />
    <P mt="4">
      Good news, your booking request has been accepted! To confirm your booking
      you need to make your first payment.
    </P>
    <PXSBold color="gray" mt="4">
      <WarningWrapper>
        <Icon icon="info" width="24px" height="24px" color="yellow" />
        Please pay within 48 hours or you will lose your booking.
      </WarningWrapper>
    </PXSBold>
    <MakePayment
      handlePayNowClick={handlePayNowClick}
      handleConfirmWithoutPayClick={handleConfirmWithoutPayClick}
      handlePaymentMethod={handlePaymentMethod}
      handleCouponChange={handleCouponChange}
      data={{
        upfront,
        bookingDays,
        paymentInfo,
        fullPrice: price,
        startDate,
        endDate,
        couponInfo,
        usedCoupon,
        bursaryDiscount,
      }}
      isNew
    />
  </>
);

const RejectedContent = ({ rejectReason }) => {
  const history = useHistory();
  return (
    <>
      <PBold mt="5" mb="1">
        Sorry, your booking request has been rejected:
      </PBold>
      <PS color={rejectReason ? 'blue' : 'gray'}>
        {rejectReason || 'Unfortunately no reason was provided by your host'}
      </PS>
      <ButtonNew
        small
        outline
        type="tertiary"
        mt="4"
        onClick={() => history.push(HOSTS_URL)}
      >
        find another host
      </ButtonNew>
    </>
  );
};

const AwaitingCancellationContent = () => {
  const history = useHistory();

  return (
    <>
      <P mt="5" mb="1">
        Thank you for your request. At PressPad we take booking cancellations
        very seriously. Our team will be looking at this and will be in touch to
        personally resolve the issue as soon as possible.
      </P>
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
  hostName,
  cancelledByIntern,
  cancellingUserMessage,
}) => {
  const history = useHistory();

  return (
    <>
      {cancelledByIntern ? (
        <>
          <P mt="5" mb="1">
            Your stay with {hostName} has been successfully cancelled. To
            confirm, you will not be charged anything for this cancellation.
            <br /> <br /> If you had to cancel due to any changes in your
            internship, please make sure you
            <Link to={MYPROFILE_URL}> update your profile now</Link>.
          </P>
          <ButtonNew
            small
            type="primary"
            mt="4"
            onClick={() => history.push(DASHBOARD_URL)}
          >
            go to dashboard
          </ButtonNew>
        </>
      ) : (
        <>
          <P mt="5" mb="1">
            Sorry, your booking with {hostName} has been cancelled. You will not
            be charged anything for this booking. Here is the reason they
            provided: <br /> <br /> {cancellingUserMessage}
          </P>
          <ButtonNew
            small
            outline
            type="tertiary"
            mt="4"
            onClick={() => history.push(HOSTS_URL)}
          >
            find another host
          </ButtonNew>
        </>
      )}
    </>
  );
};

const CancelledAfterPaymentContent = ({ hostName }) => {
  const history = useHistory();

  return (
    <>
      <P mt="5" mb="1">
        Your booking with {hostName} has been successfully cancelled.
      </P>
      <P mt="5" mb="1">
        You should have been contacted by a member of our PressPad team who will
        have advised you on next steps. If this has not happened, please{' '}
        <a href="mailto:urgent@presspad.co.uk">contact us</a>.
      </P>
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

const AutomaticCancelledContent = () => {
  const history = useHistory();

  return (
    <>
      <PS mt="5" mb="1">
        Unfortunately you did not pay within the required 48 hours and so your
        booking has been cancelled.
      </PS>
      <PS mt="5" mb="1">
        Please note that repeated failed bookings could result in your account
        being frozen.
      </PS>

      <PS mt="5" mb="1">
        If for any reason this does not look right, please{' '}
        <a href="mailto:urgent@presspad.co.uk">contact us</a> so we can help
        resolve the issue.
      </PS>
      <ButtonNew
        small
        type="tertiary"
        mt="4"
        outline
        onClick={() => history.push(HOSTS_URL)}
      >
        find another host
      </ButtonNew>
    </>
  );
};

const ConfirmedContent = ({
  hostInfo,
  isLoading,
  userRole,
  hostId,
  handlePayNowClick,
  handleConfirmWithoutPayClick,
  handlePaymentMethod,
  handleCouponChange,
  upfront,
  bookingDays,
  paymentInfo,
  bursaryDiscount,
  installments,
  updatedInstallments,
  price,
  startDate,
  endDate,
  couponInfo,
  usedCoupon,
}) => (
  <>
    {!!price && (
      <MakePayment
        handlePayNowClick={handlePayNowClick}
        handleConfirmWithoutPayClick={handleConfirmWithoutPayClick}
        handlePaymentMethod={handlePaymentMethod}
        handleCouponChange={handleCouponChange}
        data={{
          upfront,
          bookingDays,
          paymentInfo,
          installments,
          updatedInstallments,
          fullPrice: price,
          startDate,
          endDate,
          couponInfo,
          usedCoupon,
          bursaryDiscount,
        }}
      />
    )}
    <HostInternInfo info={hostInfo} isLoading={isLoading} />
    <ViewProfile hostId={hostId} />
    <TipsWrapper height="290px">
      <div>
        <TipsCard
          list={['item1', 'item2', 'Download Welcome pack']}
          userRole={userRole}
        />
        <ReportProblem />
      </div>
    </TipsWrapper>
  </>
);
const PaymentDueContent = ({
  hostInfo,
  isLoading,
  userRole,
  handlePayNowClick,
  handleConfirmWithoutPayClick,
  handleCouponChange,
  paymentInfo,
  price,
  startDate,
  endDate,
  couponInfo,
  hostId,
  installments,
  updatedInstallments,
  usedCoupon,
  bookingDays,
  dueToday,
}) => (
  <>
    <MakePayment
      handlePayNowClick={handlePayNowClick}
      handleConfirmWithoutPayClick={handleConfirmWithoutPayClick}
      handleCouponChange={handleCouponChange}
      paymentDue={dueToday}
      paymentOverdue={!dueToday}
      data={{
        paymentInfo,
        fullPrice: price,
        startDate,
        endDate,
        couponInfo,
        installments,
        updatedInstallments,
        usedCoupon,
        bookingDays,
      }}
    />
    <HostInternInfo info={hostInfo} isLoading={isLoading} />
    <ViewProfile hostId={hostId} />
    <TipsWrapper>
      <div>
        <TipsCard
          list={['item1', 'item2', 'Download Welcome pack']}
          userRole={userRole}
        />
        <ReportProblem />
      </div>
    </TipsWrapper>
  </>
);

const CompletedContent = ({ hostId, hostName, reviews, bookingId, userId }) => (
  <>
    <P mt="5" mb="1">
      Your stay with{' '}
      <ProfileLink to={HOST_PROFILE.replace(':id', hostId)}>
        {hostName}
      </ProfileLink>{' '}
      is now complete. We hope you enjoyed your stay.
    </P>
    <LeaveReview
      reviews={reviews}
      userId={userId}
      toId={hostId}
      toName={hostName}
      bookingId={bookingId}
    />
  </>
);

export {
  WaitingContent,
  AcceptedContent,
  RejectedContent,
  ConfirmedContent,
  PaymentDueContent,
  CompletedContent,
  CancelledContent,
  CancelledAfterPaymentContent,
  AutomaticCancelledContent,
  AwaitingCancellationContent,
};
