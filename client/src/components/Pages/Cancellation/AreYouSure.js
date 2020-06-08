// check for cancellation user type (host/intern) and if user cancels booking before or after any payments
// clicking yes button updates booking status and loads cofirmation (if before payment) or cancellation request (if after payment) pages
import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import * as S from './style';
import * as T from '../../Common/Typography';
import BookingDates from '../../Common/BookingDetailsBox';
import ButtonNew from '../../Common/ButtonNew';
import { BOOKING_VIEW_URL } from '../../../constants/navRoutes';

const { TextArea } = Input;

const AreYouSure = ({ bookingDetails, ...props }) => {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const { bookingInfo, cancellingUserInfo } = bookingDetails;

  const { price, startDate, endDate, payedAmount, status, _id } = bookingInfo;
  const { id, name, role } = cancellingUserInfo;

  useEffect(() => {
    if (message.length < 4) {
      setError('Message must be at least 4 characters long.');
    } else {
      setError(null);
    }
  }, [message]);

  const onChange = e => setMessage(e.target.value);

  // decide if booking is valid to be cancelled without involving admin
  const canCancelDirectly =
    payedAmount === 0 &&
    ['accepted', 'confirmed', 'awaiting admin', 'pending'].includes(status);

  const renderTextArea = () => (
    <>
      <TextArea
        onChange={onChange}
        name="message"
        value={message.length > 0 && message}
        rows={5}
        placeholder="Write your message here..."
      />
      {error && (
        <T.PS mt="5" color="red">
          * {error}
        </T.PS>
      )}
    </>
  );

  const handleCancellation = () => {
    console.log('reached');
    // needs to render booking confirmation page with different props
    if (canCancelDirectly) {
      // update booking status and redirect to booking confirmation page
    }
  };
  console.log('bookinfo', bookingInfo);
  return (
    <S.Wrapper>
      <S.ContentWrapper>
        <T.H3C mb="7">Cancel Booking</T.H3C>
        <T.H5C mb="5">Are You Sure?</T.H5C>

        <S.CancelContainer>
          {/* TEXT Variations */}
          {canCancelDirectly && (
            <>
              <T.PS mb="5">
                This will immediately cancel your booking with{' '}
                <strong>{name && name}</strong> and cannot be undone.
              </T.PS>
              <T.PS mb="5">
                Please include a message to let{' '}
                <strong>{name && name.split(' ')[0]}</strong> know why you now
                need to cancel.{' '}
              </T.PS>
              {renderTextArea()}
            </>
          )}

          <S.ButtonContainer>
            <ButtonNew
              small
              outline
              type="tertiary"
              onClick={() =>
                props.history.push(BOOKING_VIEW_URL.replace(':id', _id))
              }
            >
              go back
            </ButtonNew>

            <ButtonNew
              small
              disabled={error || !message.length}
              type="secondary"
              onClick={() => handleCancellation()}
            >
              cancel booking
            </ButtonNew>
          </S.ButtonContainer>
        </S.CancelContainer>
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
