// page listenes to route /bookings/:bookingId/cancellation-confirm
// uses user role and cancellation props to decide what kind of confirmation will be required

import React, { useState, useEffect } from 'react';
import { Input, message as messagePopup } from 'antd';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import * as S from './style';
import * as T from '../../Common/Typography';
import BookingDates from '../../Common/BookingDetailsBox';
import ButtonNew from '../../Common/ButtonNew';
import { BOOKING_VIEW_URL, Error500 } from '../../../constants/navRoutes';
import { API_CANCEL_BOOKING_URL } from '../../../constants/apiRoutes';

const { TextArea } = Input;

const CancellationConfirm = ({ ...props }) => {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  const {
    location: { state },
  } = props;
  const { bookingInfo, cancellingUserInfo } = state;

  const { price, startDate, endDate, payedAmount, status, _id } = bookingInfo;
  const { id: cancellingUserId, name, role } = cancellingUserInfo;

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

  const handleCancellation = async () => {
    // update booking status and redirect to booking confirmation page
    // case: booking before payment
    try {
      if (canCancelDirectly) {
        const { data } = await axios.patch(
          API_CANCEL_BOOKING_URL.replace(':id', _id),
          {
            cancellingUserMessage: message,
            cancellingUserId,
          },
        );
        if (data) {
          props.history.push(BOOKING_VIEW_URL.replace(':id', _id));
        }
      }
    } catch (err) {
      if (err) {
        messagePopup.error('something went wrong, try again later');
      }
    }
  };

  if (!state && !state.bookingDetails) return <Redirect to={Error500} />;

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

export default CancellationConfirm;
