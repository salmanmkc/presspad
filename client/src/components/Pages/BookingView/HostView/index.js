import React, { useReducer, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import { Modal, message } from 'antd';

import ButtonNew from '../../../Common/ButtonNew';

import BookingDates from '../BookingDates';
import HostInternInfo from '../HostInternInfo';
import TipsCard from '../TipsCard';
import CancelBookingButton from '../CancelBookingButton';

import { Wrapper, ContentWrapper, Error, TipsWrapper } from './HostView.style';
import {
  PendingContent,
  AcceptedContent,
  RejectedContent,
  ConfirmedContent,
  CompletedContent,
} from './statusContents';

import {
  API_INTERN_PROFILE_URL,
  API_ACCEPT_BOOKING_URL,
  API_REJECT_BOOKING_URL,
} from '../../../../constants/apiRoutes';
import { INTERN_PROFILE } from '../../../../constants/navRoutes';

const initialState = {
  bookingStatus: '',
  internData: {},
  isInternDataLoading: true,
  isLoading: false,
  error: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'getInternData':
      return { ...state, internData: action.value, isInternDataLoading: false };
    case 'isInternDataLoading':
      return { ...state, isInternDataLoading: true };
    case 'accept':
      return { ...state, bookingStatus: 'accepted', isLoading: false };
    case 'reject':
      return { ...state, bookingStatus: 'rejected', isLoading: false };
    case 'isLoading':
      return { ...state, isLoading: true };
    case 'isError':
      return { ...state, isLoading: false, error: action.error };
    default:
      throw new Error();
  }
};

const HostView = ({ bookingInfo, id: userId }) => {
  const history = useHistory();
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    bookingStatus,
    internData,
    isInternDataLoading,
    isLoading,
    error,
  } = state;

  const {
    _id: bookingId,
    intern,
    price,
    startDate,
    endDate,
    createdAt,
  } = bookingInfo;
  const { _id: internId } = intern;

  const handleAccept = async () => {
    // const { moneyGoTo } = this.state;

    try {
      dispatch({ type: 'isLoading' });

      await axios.patch(API_ACCEPT_BOOKING_URL.replace(':id', bookingInfo._id));

      Modal.success({
        title: 'Done!',
        content: `You successfully accepted ${
          bookingInfo.intern.name.split(' ')[0]
        }'s request`,
        onOk: () => {
          dispatch({ type: 'accept' });
        },
        onCancel: () => {
          dispatch({ type: 'accept' });
        },
      });
    } catch (err) {
      const errorMsg =
        err.response && err.response.data && err.response.data.error;
      message.error(errorMsg || 'Something went wrong');
      dispatch({ type: 'isError', error: errorMsg });
    }
  };

  const handleReject = () => {
    Modal.confirm({
      title: 'Are you sure?',
      content: `Reject ${
        bookingInfo.intern.name.split(' ')[0]
      }'s booking request?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        dispatch({ type: 'isLoading' });

        try {
          await axios.patch(
            API_REJECT_BOOKING_URL.replace(':id', bookingInfo._id),
          );

          Modal.success({
            title: 'Done!',
            content: `You successfully rejected ${
              bookingInfo.intern.name.split(' ')[0]
            }'s request`,
            onOk: () => {
              dispatch({ type: 'reject' });
            },
            onCancel: () => {
              dispatch({ type: 'reject' });
            },
          });
        } catch (err) {
          const errorMsg =
            err.response && err.response.data && err.response.data.error;
          message.error(errorMsg || 'Something went wrong');
          dispatch({ type: 'isError', error: errorMsg });
        }
      },
    });
  };

  useEffect(() => {
    dispatch({ type: 'isInternDataLoading' });
    axios
      .get(API_INTERN_PROFILE_URL.replace(':id', internId))
      .then(({ data }) => {
        dispatch({ type: 'getInternData', value: data });
      })
      .catch(err => {
        const errorMsg =
          err.response && err.response.data && err.response.data.error;
        message.error(errorMsg || 'Something went wrong');
        dispatch({ type: 'isError', error: errorMsg });
      });
  }, [internId]);

  const {
    name,
    email,
    phoneNumber,
    gender,
    school,
    hometown,
    interests,
    bio,
    reviews,
  } = internData;

  const internInfo = {
    name,
    email,
    phone_number: phoneNumber,
    gender,
    school,
    hometown,
    media_of_interest: interests,
    role: 'intern',
    bio,
  };

  const madeAt = moment(createdAt).format('Do MMM');
  const status = bookingStatus || bookingInfo.status;

  const statusContents = {
    pending: () => (
      <PendingContent
        madeAt={madeAt}
        createdAt={createdAt}
        handleAccept={handleAccept}
        handleReject={handleReject}
        isLoading={isLoading}
        error={error}
      />
    ),
    accepted: () => <AcceptedContent internName={intern.name} />,
    confirmed: () => <ConfirmedContent />,
    rejected: () => <RejectedContent />,
    completed: () => (
      <CompletedContent
        internId={internId}
        internName={intern.name}
        reviews={reviews}
        bookingId={bookingId}
        userId={userId}
        isLoading={isInternDataLoading}
      />
    ),
  };

  return (
    <Wrapper>
      <ContentWrapper>
        {statusContents[status]()}
        {status !== 'complete' && (
          <>
            <HostInternInfo info={internInfo} isLoading={isInternDataLoading} />
            <ButtonNew
              small
              outline
              type="tertiary"
              mt="4"
              onClick={() =>
                history.push(INTERN_PROFILE.replace(':id', internId))
              }
            >
              view profile
            </ButtonNew>
          </>
        )}
        {(status === 'accepted' || status === 'confirmed') && (
          <>
            <TipsWrapper height="290px">
              <div>
                <TipsCard
                  list={[
                    'tip number 1',
                    'tip 2',
                    'some other tip that longer than others',
                  ]}
                  userRole="host"
                />
              </div>
            </TipsWrapper>
          </>
        )}
      </ContentWrapper>
      <CancelBookingButton>cancel booking</CancelBookingButton>

      <BookingDates
        price={price / 100}
        startDate={startDate}
        endDate={endDate}
        intern
      />
    </Wrapper>
  );
};

export default HostView;
