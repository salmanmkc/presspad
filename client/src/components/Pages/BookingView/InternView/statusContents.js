import React from 'react';

import { PXSBold, P, PS, PBold } from '../../../Common/Typography';
import ButtonNew from '../../../Common/ButtonNew';
import Icon from '../../../Common/Icon';

import HostInternInfo from '../HostInternInfo';
import TipsCard from '../TipsCard';

import MakePayment from './MakePayment';
import ReportProblem from './ReportProblem';
import { WarningWrapper, TipsWrapper, ProfileLink } from './InternView.style';

import { HOST_PROFILE } from '../../../../constants/navRoutes';

// import Reviews from '../../../Common/Reviews';
// import { Card } from '../../../Common/Profile/Profiles.style';

const WaitingContent = ({ hostRespondingTime }) => (
  <>
    <PXSBold color="gray" mt="1">
      This host usually takes around {hostRespondingTime || 7} days to respond
    </PXSBold>
    <P mt="5" mb="1">
      Your booking request has been successfully submitted. Make sure to check
      your account for a response.
    </P>
    <ButtonNew small outline type="tertiary" mt="4">
      view profile
    </ButtonNew>
  </>
);
const AcceptedContent = ({
  handlePayNowClick,
  handleCouponChange,
  paymentInfo,
  price,
  startDate,
  endDate,
  couponInfo,
}) => (
  <>
    <ButtonNew small outline type="tertiary" mt="4">
      view profile
    </ButtonNew>
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
      handleCouponChange={handleCouponChange}
      data={{
        paymentInfo,
        fullPrice: price,
        startDate,
        endDate,
        couponInfo,
      }}
      isNew
    />
  </>
);

const RejectedContent = ({ rejectReason }) => (
  <>
    <PBold mt="5" mb="1">
      Sorry, your booking request has been rejected:
    </PBold>
    <PS color={rejectReason ? 'blue' : 'gray'}>
      {rejectReason || 'Unfortunately no reason was provided by your host'}
    </PS>
    <ButtonNew small outline type="tertiary" mt="4">
      find another host
    </ButtonNew>
  </>
);
const ConfirmedContent = ({ hostInfo, isLoading, userRole }) => (
  <>
    <HostInternInfo info={hostInfo} isLoading={isLoading} />
    <ButtonNew small outline type="tertiary" mt="4">
      view profile
    </ButtonNew>
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
    <ButtonNew small outline type="tertiary" mt="4">
      view profile
    </ButtonNew>
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

const CompletedContent = ({ hostId, hostName }) => (
  <>
    <P mt="5" mb="1">
      Your stay with{' '}
      <ProfileLink to={HOST_PROFILE.replace(':id', hostId)}>
        {hostName}
      </ProfileLink>{' '}
      is now complete. We hope you enjoyed your stay.
    </P>
    <div>
      Leave a review component should go here. also if inter already given a
      review?
      {/* <Card>
          <Reviews userId={hostId} name={name} userRole="host" />
        </Card> */}
    </div>
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
