import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd';

import * as S from './style';
import * as T from '../../../../Common/Typography';

import validateCancelBooking from './schema';

import { PBold, PL } from '../../../../Common/Typography';
import GoBackComponent from '../../../../Common/GoBack';
import ButtonNew from '../../../../Common/ButtonNew';

import BookingCancellationDetails from './BookingCancellationDetails';
import AdminActions from './AdminActions';

import { API_CANCEL_BOOKING_AFTER_PAYMENT_URL } from '../../../../../constants/apiRoutes';
import { ADMIN_BOOKINGS_URL } from '../../../../../constants/navRoutes';
import { SERVER_ERROR } from '../../../../../constants/errorMessages';

const BookingReview = ({
  setBookingView,
  details,
  reviewBooking,
  setReviewBooking,
}) => {
    const { paidAmount, _id: bookingId } = details;

  const [cancelBookingState, setCancelBookingState] = useState({
    cancellationReason: '',
    responsibleParty: '',
    notes: '',
  });

  const [refundState, setRefundState] = useState({
    hostRefund: 0,
    internRefund: 0,
    organisationRefund: 0,
    pressPadRefund: 0,
    sum: 0,
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const history = useHistory();

  const handleSubmit = () => {
    const data = {
      ...cancelBookingState,
      ...refundState,
    };

    // check if allocation has started

      validateCancelBooking(paidAmount)
      .validate(data, { abortEarly: false })
      .then(async res => {
        setErrors({});
        setLoading(true);

        await axios.post(
          API_CANCEL_BOOKING_AFTER_PAYMENT_URL.replace(':id', bookingId),
          res,
        );
        setReviewBooking(false);
      })
      .catch(err => {
        if (err.name === 'ValidationError') {
          const _errors = {};
          err.inner.forEach(element => {
            _errors[element.path.split('.')[0]] = element.message;
          });
          setErrors({ ...errors, ..._errors });
        } else {
          message.error(SERVER_ERROR);
        }
        setLoading(false);
      });
  };

  return (
    <>
      {/* REVIEW MODE */}
      {reviewBooking ? (
        <S.Wrapper>
          <S.GoBackWrapper>
            <GoBackComponent
              onClick={() => {
                setReviewBooking(false);
                setBookingView(false);
              }}
            />
          </S.GoBackWrapper>
          <T.H2 color="darkBlue" mb={6}>
            Review Booking
          </T.H2>
          {/* BOOKING DETAILS */}
          <BookingCancellationDetails details={details} />
          {/* ACTIONS FOR ADMIN REVIEW */}
          <AdminActions
            details={details}
            cancelBookingState={cancelBookingState}
            setCancelBookingState={setCancelBookingState}
            refundState={refundState}
            setRefundState={setRefundState}
            errors={errors}
            setErrors={setErrors}
          />
          {/* ERROR */}
          <PBold mt={6} color="red">
            {errors &&
              Object.keys(errors).length > 0 &&
              'Please make sure you fill in all relevant details'}
          </PBold>
          {/* SUBMIT BUTTOM */}
          <ButtonNew
            large
            type="primary"
            mt="8"
            color="blue"
            onClick={handleSubmit}
            loading={loading}
          >
            confirm cancellation
          </ButtonNew>
        </S.Wrapper>
      ) : (
        <>
          {/* VIEW MODE */}
          <S.Wrapper>
            <S.CancelSuccessWrapper>
              <PBold color="darkGray" mb={3}>
                ADMIN ACTIONS
              </PBold>
              <PL mb={2}>This booking has been successfully cancelled.</PL>
              <PL>
                If you have selected to refund the intern, this has been added
                to your <strong>Payments</strong> section. You must refund them
                manually. Please make sure to get the intern’s bank details and
                mark as complete once they have been refunded.
              </PL>
              <ButtonNew
                style={{ width: '300px' }}
                large
                type="primary"
                mt="6"
                color="blue"
                onClick={() => {
                  setReviewBooking(false);
                  setBookingView(false);
                  history.push(ADMIN_BOOKINGS_URL);
                }}
              >
                return to bookings
              </ButtonNew>
            </S.CancelSuccessWrapper>

            <S.DetailsWrapper>
              <PBold mb={6}>CANCELLATION DETAILS</PBold>
              <BookingCancellationDetails details={details} />
            </S.DetailsWrapper>
          </S.Wrapper>
        </>
      )}
    </>
  );
};
export default BookingReview;
