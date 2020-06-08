// check for cancellation user type (host/intern) and if user cancels booking before or after any payments
// clicking yes button updates booking status and loads cofirmation (if before payment) or cancellation request (if after payment) pages
import React, { useState } from 'react';
import * as S from './style';
import * as T from '../../Common/Typography';
import BookingDates from '../../Common/BookingDetailsBox';

const AreYouSure = ({ bookingDetails, ...props }) => {
  console.log(props);

  const { bookingInfo, cancellingUserInfo } = bookingDetails;

  const { price, startDate, endDate } = bookingInfo;
  const { id, name, role } = cancellingUserInfo;

  return (
    <S.Wrapper>
      <S.ContentWrapper>
        <T.H3C mb="7">Cancel Booking</T.H3C>
        <T.H5C>Are You Sure?</T.H5C>
        {/* TEXT Variations */}
      </S.ContentWrapper>
      <BookingDates
        price={price}
        startDate={startDate}
        endDate={endDate}
        intern={role === 'intern'}
      />
    </S.Wrapper>
  );
};
export default AreYouSure;
