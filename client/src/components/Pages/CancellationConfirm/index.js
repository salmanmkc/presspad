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

import textContent from './textContent';

const { TextArea } = Input;

const CancellationConfirm = ({ ...props }) => {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [cancelAfterPage, setCancelAfterPage] = useState(1);

  // includes booking and cancellation details
  const {
    location: { state },
    role: loggedInUserRole,
  } = props;

  const { bookingInfo, cancellingUserInfo } = state;

  const {
    price,
    startDate,
    endDate,
    payedAmount,
    status,
    _id: bookingId,
    intern,
    host,
  } = bookingInfo;

  const { id: cancellingUserId, role: cancellingUserRole } = cancellingUserInfo;

  const decideName = () =>
    cancellingUserRole === 'host' ? intern.name : host.name;
  const nameCancelledUser = decideName();

  // decide if booking is valid to be cancelled before or after payment
  const canCancelDirectly =
    payedAmount === 0 &&
    ['accepted', 'confirmed', 'awaiting admin', 'pending'].includes(status);

  const canCancelAfterPayment =
    payedAmount > 0 && ['accepted', 'confirmed'].includes(status);

  // validates length of message input
  useEffect(() => {
    const wordCount = message.trim().split(/\s+/).length;
    if (
      (canCancelDirectly && wordCount < 5) ||
      (canCancelAfterPayment && cancelAfterPage === 2 && wordCount < 5)
    ) {
      setError('Please write some words about why you want to cancel.');
    } else {
      setError(null);
    }
  }, [canCancelAfterPayment, canCancelDirectly, cancelAfterPage, message]);

  const onChange = e => setMessage(e.target.value);

  // message input area
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
    try {
      if (
        canCancelDirectly ||
        (canCancelAfterPayment && cancelAfterPage === 2)
      ) {
        const { data } = await axios.patch(
          API_CANCEL_BOOKING_URL.replace(':id', bookingId),
          {
            cancellingUserMessage: message,
            cancellingUserId,
          },
        );
        if (data) {
          props.history.push(BOOKING_VIEW_URL.replace(':id', bookingId));
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
              {textContent.cancelBeforePaymentTop(nameCancelledUser)}
              {textContent.cancelBeforePaymentBottom(nameCancelledUser)}
              {renderTextArea()}
            </>
          )}
          {canCancelAfterPayment && cancelAfterPage === 1 && (
            <>
              {textContent.cancelAfterPaymentOneTop()}
              {textContent.cancelAfterPaymentOneBottom(loggedInUserRole)}
            </>
          )}
          {canCancelAfterPayment && cancelAfterPage === 2 && (
            <>
              {textContent.cancelAfterPaymentTwoTop(loggedInUserRole)}
              {textContent.cancelAfterPaymentTwoBottom()}
              {renderTextArea()}
            </>
          )}

          <S.ButtonContainer>
            <ButtonNew
              small
              outline
              type="tertiary"
              onClick={() => {
                // reset page to 1
                setCancelAfterPage(1);
                props.history.push(BOOKING_VIEW_URL.replace(':id', bookingId));
              }}
            >
              go back
            </ButtonNew>
            <ButtonNew
              small
              disabled={
                error ||
                // invalid message input for direct cancel or page 2 after payment cancel
                (canCancelDirectly && !message.length) ||
                (canCancelAfterPayment &&
                  cancelAfterPage === 2 &&
                  !message.length)
              }
              type="secondary"
              onClick={() =>
                // check if on page 2 or can cancel directly
                canCancelAfterPayment && cancelAfterPage === 1
                  ? setCancelAfterPage(2)
                  : handleCancellation()
              }
            >
              cancel booking
            </ButtonNew>
          </S.ButtonContainer>
        </S.CancelContainer>
      </S.ContentWrapper>

      <BookingDates
        price={price}
        payedSoFar={payedAmount}
        startDate={startDate}
        endDate={endDate}
        intern={cancellingUserRole === 'intern'}
      />
    </S.Wrapper>
  );
};

export default CancellationConfirm;
