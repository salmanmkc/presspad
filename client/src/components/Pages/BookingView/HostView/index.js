import React, { useReducer, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import { message } from 'antd';

import { H4C } from '../../../Common/Typography';
import ButtonNew from '../../../Common/ButtonNew';

import BookingDates from '../../../Common/BookingDetailsBox';
import HostInternInfo from '../HostInternInfo';
import TipsCard from '../TipsCard';
import CancelBookingButton from '../CancelBookingButton';
import { formatPrice } from '../../../../helpers';

import {
  PendingContent,
  AcceptedContent,
  RejectedContent,
  ConfirmedContent,
  CompletedContent,
  CancelledContent,
} from './statusContents';
import WarningModal from './WarningModal';
import { Wrapper, ContentWrapper, TipsWrapper } from './HostView.style';
import reducer from './reducer';

import {
  API_INTERN_PROFILE_URL,
  API_ACCEPT_BOOKING_URL,
} from '../../../../constants/apiRoutes';
import {
  INTERN_PROFILE,
  CANCELLATION_CONFIRM,
} from '../../../../constants/navRoutes';

const initialState = {
  bookingStatus: '',
  internData: {},
  isLoading: {
    internData: true,
  },
  visible: false,
  error: '',
};

const HostView = ({ bookingInfo, id: userId, ...props }) => {
  const history = useHistory();
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    bookingStatus,
    internData,
    isLoading,
    visible,
    overLapping,
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

  const handleAccept = async (e, cancelOthers, setLoading) => {
    // const { moneyGoTo } = this.state;
    try {
      if (cancelOthers) {
        setLoading(true);
      } else {
        dispatch({ type: 'isAcceptLoading' });
      }

      const acceptUrl = `${API_ACCEPT_BOOKING_URL.replace(
        ':id',
        bookingInfo._id,
      )}/${cancelOthers ? '?cancel-others=true' : ''}`;

      await axios.patch(acceptUrl);

      message
        .success(
          `You successfully accepted ${bookingInfo.intern.name.split(
            ' ',
          )}'s request`,
          2,
        )
        .then(() => {
          dispatch({ type: 'accept' });
        });
    } catch (err) {
      if (err.response.status === 409) {
        dispatch({
          type: 'openModal',
          value: err.response.data.overLappingBookings,
        });
      } else {
        const errorMsg =
          err.response && err.response.data && err.response.data.error;
        message.error(errorMsg || 'Something went wrong');
        dispatch({ type: 'isError', error: errorMsg });
      }
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
      .get(
        `${API_INTERN_PROFILE_URL.replace(
          ':id',
          internId,
        )}?view=booking_details`,
      )
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
    cancelled: () => (
      <CancelledContent
        cancellingUserMessage={
          bookingInfo.cancellationDetails.cancellingUserMessage || 'N/A'
        }
        cancelledByHost={bookingInfo.cancellationDetails.cancelledBy === userId}
        internName={intern.name}
      />
    ),

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
        handleAccept={handleAccept}
        handleClose={handleModalClose}
        internName={intern.name}
        bookingId={bookingId}
        visible={visible}
        overLapping={overLapping}
        acceptError={error}
      />
      <ContentWrapper>
        {status === 'cancelled' && <H4C mb="7">booking cancelled</H4C>}
        {statusContents[status]()}
        {!['completed', 'cancelled'].includes(status) && (
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

      {status !== 'cancelled' && status !== 'completed' && (
        <CancelBookingButton
          // this loads confirm cancellatiom page and sends user and booking infos
          onClick={() => {
            const { name, role } = props;
            const cancellingUserInfo = { id: userId, name, role };
            const url = CANCELLATION_CONFIRM.replace(':id', bookingId);

            return history.push({
              pathname: url,
              state: { bookingInfo, cancellingUserInfo },
            });
          }}
        >
          cancel booking request
        </CancelBookingButton>
      )}

      <BookingDates
        price={formatPrice(price)}
        startDate={startDate}
        endDate={endDate}
        intern
      />
    </Wrapper>
  );
};

export default HostView;
