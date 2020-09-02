import React from 'react';
import moment from 'moment';

import { Row, Skeleton, Alert } from 'antd';

import { formatPrice } from '../../../../helpers';

import { BookingInfoWrapper, InfoText, InfoValue } from './PaymentsPlan.style';

import {
  SectionWrapperContent,
  SectionTitle,
  PayButton,
} from '../../../Common/general';

const BookingInfo = props => {
  const { isLoading, data, handlePayNowClick, role } = props;
  const {
    bookingId,
    price: fullPrice,
    paidAmount,
    startDate,
    status,
    endDate,
    installments,
    firstUnpaidInstallment,
    couponDiscount,
    coupons,
  } = data;

  let discounts = 0;
  if (!installments[0]) {
    discounts = couponDiscount;
  } else {
    // get all coupons that have been used for this bookings
    coupons.forEach(({ transactions }) => {
      if (transactions) {
        transactions.forEach(transaction => {
          if (transaction.booking === bookingId) {
            discounts += transaction.amount;
          }
        });
      }
    });
  }

  return (
    <SectionWrapperContent>
      <BookingInfoWrapper>
        <SectionTitle>Your Booking</SectionTitle>
        <Skeleton loading={isLoading} />
        {isLoading === false && (
          <>
            <InfoText>
              {role === 'intern'
                ? "You've booked your stay for"
                : 'You are booked for'}
            </InfoText>
            <InfoValue mbottom="2.5rem" align="center">
              {moment(startDate).format('DD MMM')}&nbsp;-&nbsp;
              {moment(endDate).format('DD MMM')}
            </InfoValue>
            <InfoText>Full price for period</InfoText>
            <InfoValue mbottom="2.5rem" align="center" light>
              £{formatPrice(fullPrice)}
            </InfoValue>
            {status === 'confirmed' ? (
              <>
                <InfoText>Coupon discounts</InfoText>
                <InfoValue mbottom="2.5rem" align="center" light>
                  £{formatPrice(discounts)}
                </InfoValue>
                <InfoText>
                  {role === 'intern'
                    ? 'So far you’ve paid'
                    : 'So far you’ve recieved'}
                </InfoText>
                <InfoValue mbottom="2.5rem" align="center" light>
                                  £{formatPrice(paidAmount)}
                </InfoValue>
              </>
            ) : null}
          </>
        )}
      </BookingInfoWrapper>
      {isLoading === false &&
        installments[0] &&
        status === 'confirmed' &&
        firstUnpaidInstallment && (
          <>
            <InfoText>
              {role === 'intern'
                ? 'Your next payment is due'
                : 'Next payment is due'}
            </InfoText>
            <Row type="flex" justify="space-around">
              <InfoValue mbottom="2.5rem" align="center">
                {moment(firstUnpaidInstallment.dueDate).format('DD MMM')}
              </InfoValue>
              <InfoValue mbottom="2.5rem" align="center">
                £
                {firstUnpaidInstallment.amount &&
                  formatPrice(firstUnpaidInstallment.amount)}
              </InfoValue>
              {role === 'intern' && (
                <PayButton onClick={() => handlePayNowClick(true)}>
                  Pay £{formatPrice(firstUnpaidInstallment.amount)} now
                </PayButton>
              )}
            </Row>
          </>
        )}
      {status !== 'confirmed' ? (
        <Alert type="warning" message={`Your booking status is ${status}`} />
      ) : null}
    </SectionWrapperContent>
  );
};
export default BookingInfo;
