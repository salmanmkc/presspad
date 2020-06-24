import React from 'react';
import moment from 'moment';

import { H4, H7C } from '../Typography';
import {
  Wrapper,
  AbsoluteWrapper,
  BookingDateWrapper,
  DayNumber,
} from './BookingDetails.style';
import { formatPrice } from '../../../helpers';

const BookingInfo = ({ startDate, endDate, price, payedSoFar, intern }) => {
  const startDay = moment(startDate).format('DD');
  const endDay = moment(endDate).format('DD');
  const startMonth = moment(startDate).format('MMM');
  const endMonth = moment(endDate).format('MMM');

  return (
    <Wrapper>
      <AbsoluteWrapper>
        <H7C color="white">BOOKING DATES</H7C>
        <BookingDateWrapper>
          <div>
            <DayNumber>{startDay}</DayNumber>
            <H7C color="white">{startMonth}</H7C>
          </div>
          <DayNumber>-</DayNumber>
          <div>
            <DayNumber>{endDay}</DayNumber>
            <H7C color="white">{endMonth}</H7C>
          </div>
        </BookingDateWrapper>
        {/* Price Render */}
        {payedSoFar ? (
          <>
            <H7C color="white">Payed so far</H7C>{' '}
            <H4 color="white">£{formatPrice(payedSoFar)}</H4>
          </>
        ) : (
          <>
            {' '}
            {intern ? (
              <H7C color="white">full price for the period</H7C>
            ) : (
              <H7C color="white">earnings</H7C>
            )}
            <H4 color="white">£{formatPrice(price)}</H4>{' '}
          </>
        )}
      </AbsoluteWrapper>
    </Wrapper>
  );
};

export default BookingInfo;
