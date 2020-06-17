import React from 'react';
import { useHistory } from 'react-router-dom';

import { PXSBold, P, PS, PBold } from '../../../Common/Typography';
import ButtonNew from '../../../Common/ButtonNew';
import Icon from '../../../Common/Icon';

import HostInternInfo from '../HostInternInfo';
import TipsCard from '../TipsCard';
import LeaveReview from '../LeaveReview';

import MakePayment from './MakePayment';
import ReportProblem from './ReportProblem';
import { WarningWrapper, TipsWrapper, ProfileLink } from './InternView.style';

import { HOST_PROFILE, HOSTS_URL } from '../../../../constants/navRoutes';

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
const ConfirmedContent = ({
  hostInfo,
  isLoading,
  userRole,
  hostId,
  handlePayNowClick,
  handlePaymentMethod,
  handleCouponChange,
  upfront,
  bookingDays,
  paymentInfo,
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
  handleCouponChange,
  paymentInfo,
  price,
  startDate,
  endDate,
  couponInfo,
  hostId,
}) => (
  <>
    <P mt="5" mb="1">
      Your next payment is due! Please complete your payment below:
    </P>
    <MakePayment
      handlePayNowClick={handlePayNowClick}
      handleCouponChange={handleCouponChange}
      data={{
        paymentInfo,
        fullPrice: price,
        startDate,
        endDate,
        couponInfo,
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
};
