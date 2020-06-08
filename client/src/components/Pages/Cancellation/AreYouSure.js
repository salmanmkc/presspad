// check for cancellation user type (host/intern) and if user cancels booking before or after any payments
// clicking yes button updates booking status and loads cofirmation (if before payment) or cancellation request (if after payment) pages
import React, { useState } from 'react';
import { Input } from 'antd';
import * as S from './style';
import * as T from '../../Common/Typography';
import BookingDates from '../../Common/BookingDetailsBox';
import ButtonNew from '../../Common/ButtonNew';

const { TextArea } = Input;

const AreYouSure = ({ bookingDetails, ...props }) => {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const { bookingInfo, cancellingUserInfo } = bookingDetails;
  console.log('bookinfo', bookingInfo);
  const { price, startDate, endDate, payedAmount, status } = bookingInfo;
  const { id, name, role } = cancellingUserInfo;

  const onChange = e => setMessage(e.target.value);

  // decide if booking is valid to be cancelled without involving admin
  const canCancelDirectly =
    payedAmount === 0 &&
    ['accepted', 'confirmed', 'awaiting admin', 'pending'].includes(status);

  return (
    <S.Wrapper>
      <S.ContentWrapper>
        <T.H3C mb="7">Cancel Booking</T.H3C>
        <T.H5C mb="5">Are You Sure?</T.H5C>
        {/* TEXT Variations */}
        {canCancelDirectly && (
          <S.CancelContainer>
            <T.PS mb="5">
              This will immediately cancel your booking with{' '}
              <strong>{name && name}</strong> and cannot be undone.
            </T.PS>
            <T.PS mb="5">
              Please include a message to let{' '}
              <strong>{name && name.split(' ')[0]}</strong> know why you now
              need to cancel.{' '}
            </T.PS>
            <TextArea
              onChange={onChange}
              name="message"
              value={message.length > 0 && message}
              rows={5}
              placeholder="Write your message here..."
            />
            <S.ButtonContainer>
              <ButtonNew
                small
                outline
                type="tertiary"

                // onClick={() =>
                //   history.push(INTERN_PROFILE.replace(':id', internId))
                // }
              >
                go back
              </ButtonNew>

              <ButtonNew
                small
                type="primary"
                // onClick={() =>
                //   history.push(INTERN_PROFILE.replace(':id', internId))
                // }
              >
                cancel booking
              </ButtonNew>
              {error && <S.ErrorWrapper error={error} marginBottom="12px" />}
            </S.ButtonContainer>
          </S.CancelContainer>
        )}
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
