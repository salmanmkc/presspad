import React, { useReducer, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import { message } from 'antd';

import ButtonNew from '../../../Common/ButtonNew';
import { Modal } from '../../../Common/AntdWrappers';

import BookingDates from '../BookingDates';
import HostInternInfo from '../HostInternInfo';
import TipsCard from '../TipsCard';
import CancelBookingButton from '../CancelBookingButton';

import {
  PendingContent,
  AcceptedContent,
  RejectedContent,
  ConfirmedContent,
  CompletedContent,
} from './statusContents';
import WarningModal from './WarningModal';
import { Wrapper, ContentWrapper, Error, TipsWrapper } from './HostView.style';

import {
  API_INTERN_PROFILE_URL,
  API_ACCEPT_BOOKING_URL,
} from '../../../../constants/apiRoutes';
import { INTERN_PROFILE } from '../../../../constants/navRoutes';

const initialState = {
  bookingStatus: '',
  internData: {},
  isLoading: {
    internData: true,
  },
  visible: false,
  error: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'getInternData':
      return {
        ...state,
        internData: action.value,
        isLoading: { ...state.isLoading, internData: false },
      };
    case 'isInternDataLoading':
      return { ...state, isLoading: { ...state.isLoading, internData: true } };
    case 'accept':
      return {
        ...state,
        bookingStatus: 'accepted',
        isLoading: { ...state.isLoading, accept: false },
      };
    case 'isAcceptLoading':
      return { ...state, isLoading: { ...state.isLoading, accept: true } };
    case 'reject':
      return {
        ...state,
        bookingStatus: 'rejected',
        visible: false,
      };
    case 'closeModal':
      return { ...state, visible: false };
    case 'openModal':
      return { ...state, visible: true };
    case 'isError':
      return { ...state, isLoading: {}, error: action.error };
    default:
      throw new Error();
  }
};

const HostView = ({ bookingInfo, id: userId }) => {
  const history = useHistory();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { bookingStatus, internData, isLoading, visible, error } = state;

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
      dispatch({ type: 'isAcceptLoading' });

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
    dispatch({ type: 'reject' });
  };

  const handleModalClose = () => {
    dispatch({ type: 'closeModal' });
  };
  const handleModalOpen = () => {
    dispatch({ type: 'openModal' });
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
    phoneNumber,
    gender,
    school,
    hometown,
    interests,
    bio,
    reviews,
  } = internData;

  const internInfo = {
    name: intern.name,
    email: intern.email,
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
        handleReject={handleModalOpen}
        isAcceptLoading={isLoading.accept}
        isRejectLoading={isLoading.reject}
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
        isLoading={isLoading.internData}
      />
    ),
  };

  return (
    <Wrapper>
      <WarningModal
        handleReject={handleReject}
        handleClose={handleModalClose}
        internName={intern.name}
        bookingId={bookingId}
        visible={visible}
      />
      <ContentWrapper>
        {statusContents[status]()}
        {status !== 'completed' && (
          <>
            <HostInternInfo
              info={internInfo}
              isLoading={isLoading.internData}
            />
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
