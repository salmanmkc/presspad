import React from 'react';
import moment from 'moment';

import { H4, H7C } from '../../../Common/Typography';
import { Wrapper, BookingDateWrapper, DayNumber } from './BookingDates.style';

const BookingInfo = ({ startDate, endDate, price, intern }) => {
  const startDay = moment(startDate).format('DD');
  const endDay = moment(endDate).format('DD');
  const startMonth = moment(startDate).format('MMM');
  const endMonth = moment(endDate).format('MMM');

  return (
    <Wrapper>
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
      {intern ? (
        <H7C color="white">full price for the period</H7C>
      ) : (
        <H7C color="white">earnings</H7C>
      )}
      <H4 color="white">£{price}</H4>
    </Wrapper>
  );
};

export default BookingInfo;
