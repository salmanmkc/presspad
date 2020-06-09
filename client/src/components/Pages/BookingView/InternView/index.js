/* eslint-disable consistent-return */
import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { message, Spin } from 'antd';
import { Elements } from 'react-stripe-elements';

import {
  getDiscountDays,
  calculatePrice,
  createInstallments,
  getFirstUnpaidInstallment,
} from '../helpers';

import { H4C, H5C, H6C } from '../../../Common/Typography';

import BookingDates from '../../../Common/BookingDetailsBox';
import CancelBookingButton from '../CancelBookingButton';

import PayNowModal from './PayNowModal';
import { Wrapper, ContentWrapper } from './InternView.style';
import {
  WaitingContent,
  AcceptedContent,
  RejectedContent,
  ConfirmedContent,
  PaymentDueContent,
  CompletedContent,
  CancelledContent,
} from './statusContents';

import {
  API_COUPON_URL,
  API_HOST_PROFILE_URL,
} from '../../../../constants/apiRoutes';
import {
  Error404,
  Error500,
  CANCELLATION_CONFIRM,
} from '../../../../constants/navRoutes';
import { calculateHostRespondingTime } from '../../../../helpers';

export default class BookingView extends Component {
  state = {
    profile: {},
    reviews: [],
    couponInfo: {
      couponCode: '',
      discountDays: 0,
      discountRate: 0,
      couponDiscount: 0,
      isCouponLoading: null,
      error: '',
    },
    payNow: false,
    upfront: true,
    isLoading: true,
  };

  async componentDidMount() {
    const { bookingInfo } = this.props;

    this.setState({ isLoading: true });

    const url = API_HOST_PROFILE_URL.replace(':id', bookingInfo.host._id);
    try {
      const {
        data: { listing, profile, reviews },
      } = await axios.get(url);
      // eslint-disable-next-line react/no-unused-state
      this.setState({ isLoading: false, listing, profile, reviews });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        message.destroy();
        return message
          .error('profile not found', 4)
          .then(() => this.props.history.push(Error404));
      }
      message.destroy();
      message
        .error('something went wrong', 4)
        .then(() => this.props.history.push(Error500));
    }
  }

  handleCouponChange = async e => {
    const code = e.target.value;
    if (!code) {
      return this.setState(prevState => ({
        couponInfo: {
          ...prevState.couponInfo,
          isCouponLoading: false,
          couponDiscount: 0,
          couponCode: '',
          error: '',
        },
      }));
    }
    // only send requests if the code is valid
    if (
      !code ||
      typeof code !== 'string' ||
      code.length < 7 ||
      code.length > 14
    ) {
      this.setState(prevState => ({
        couponInfo: { ...prevState.couponInfo, couponCode: code },
      }));
    } else {
      this.setState(
        prevState => ({
          couponInfo: {
            ...prevState.couponInfo,
            couponCode: code,
            isCouponLoading: true,
            error: false,
          },
        }),
        async () => {
          try {
            const {
              data: {
                data: [couponInfo],
              },
            } = await axios.get(`${API_COUPON_URL}?code=${code}`);

            const {
              startDate: couponStart,
              endDate: couponEnd,
              discountRate,
              usedDays,
              usedAmount,
              reservedAmount,
            } = couponInfo;

            const {
              bookingInfo: { startDate, endDate },
            } = this.props;

            const { discountDays } = getDiscountDays({
              bookingStart: startDate,
              bookingEnd: endDate,
              couponStart,
              couponEnd,
              usedDays,
            });

            let couponDiscount =
              (calculatePrice(discountDays) * discountRate) / 100;

            const availableAmount = reservedAmount - usedAmount;
            if (availableAmount < couponDiscount) {
              couponDiscount = availableAmount;
            }

            this.setState(prevState => {
              const newCouponState = {
                ...prevState.couponInfo,
                discountDays,
                discountRate,
                couponDiscount,
                isCouponLoading: false,
                error: false,
              };
              if (discountDays === 0) {
                newCouponState.error =
                  "the coupon is expired or doesn't cover this booking period";
              }
              return { couponInfo: newCouponState };
            });
          } catch (error) {
            let errorMsg = 'something went wrong';
            if (error.response && error.response.status === 404) {
              errorMsg = 'wrong code ..';
            }
            this.setState(prevState => ({
              couponInfo: {
                ...prevState.couponInfo,
                isCouponLoading: false,
                error: errorMsg,
                couponDiscount: 0,
              },
            }));
          }
        },
      );
    }
  };

  handlePayNowClick = payNow => this.setState({ payNow });

  // handlePaymentMethod = upfront => this.setState({ upfront });

  render() {
    const { bookingInfo, role, id } = this.props;
    const { installments, host } = bookingInfo;

    const hostRespondingTime =
      host &&
      calculateHostRespondingTime(host.respondingTime, host.respondedRequests);

    const {
      isLoading,
      profile,
      listing,
      couponInfo,
      payNow,
      upfront,
      reviews,
    } = this.state;

    const { interests, phoneNumber, school, hometown, gender, bio } = profile;

    const hostInfo = {
      name: host.name,
      email: host.email,
      phone_number: phoneNumber,
      address: listing && listing.address,
      gender,
      'university_/_school': school,
      hometown,
      area_of_interest: interests,
      role: 'host',
      bio,
    };

    let firstUnpaidInstallment;
    if (installments[0]) {
      firstUnpaidInstallment = getFirstUnpaidInstallment(installments);
    }

    let newInstallments = [];
    const {
      price,
      startDate,
      endDate,
      status,
      rejectReason,
      _id: bookingId,
    } = bookingInfo;

    const { couponDiscount } = couponInfo;
    const netAmount = price - couponDiscount;
    if (!installments[0]) {
      newInstallments = createInstallments(
        netAmount,
        startDate,
        endDate,
        upfront,
      );
    }

    const paymentInfo = installments[0]
      ? firstUnpaidInstallment
      : newInstallments;

    const bookingStatuses = {
      awaitingAdmin: {
        status: 'awaiting host response',
        statusContentsComponent: () => (
          <WaitingContent
            hostId={host._id}
            hostRespondingTime={hostRespondingTime}
          />
        ),
      },
      pending: {
        status: 'awaiting host response',
        statusContentsComponent: () => (
          <WaitingContent
            hostId={host._id}
            hostRespondingTime={hostRespondingTime}
          />
        ),
      },
      rejected: {
        status: 'rejected',
        statusColor: 'pink',
        statusContentsComponent: () => (
          <RejectedContent rejectReason={rejectReason} />
        ),
      },
      cancelled: {
        status: 'cancelled',
        statusColor: 'pink',
        statusContentsComponent: () => (
          <CancelledContent
            cancellingUserMessage={
              bookingInfo.cancellationDetails.cancellingUserMessage || 'N/A'
            }
            cancelledByIntern={
              bookingInfo.cancellationDetails.cancelledBy === id
            }
            hostName={host.name}
          />
        ),
      },
      completed: {
        status: 'complete',
        statusContentsComponent: () => (
          <CompletedContent
            userId={id}
            hostId={host._id}
            hostName={host.name}
            isLoading={isLoading}
            reviews={reviews}
            bookingId={bookingId}
          />
        ),
      },
      accepted: {
        status: 'accepted',
        statusContentsComponent: () => (
          <AcceptedContent
            hostId={host._id}
            handlePayNowClick={this.handlePayNowClick}
            handleCouponChange={this.handleCouponChange}
            paymentInfo={paymentInfo}
            price={price}
            startDate={startDate}
            endDate={endDate}
            couponInfo={couponInfo}
          />
        ),
      },
      confirmed: {
        status: 'confirmed',
        statusContentsComponent: () => (
          <ConfirmedContent
            hostId={host._id}
            hostInfo={hostInfo}
            isLoading={isLoading}
            userRole={role}
          />
        ),
      },
    };

    if (
      status === 'confirmed' &&
      firstUnpaidInstallment &&
      moment().isSame(firstUnpaidInstallment.dueDate, 'day')
    ) {
      bookingStatuses.confirmed = {
        status: 'payment due',
        statusContentsComponent: () => (
          <PaymentDueContent
            hostId={host._id}
            hostInfo={hostInfo}
            isLoading={isLoading}
            userRole={role}
            handlePayNowClick={this.handlePayNowClick}
            handleCouponChange={this.handleCouponChange}
            paymentInfo={paymentInfo}
            price={price}
            startDate={startDate}
            endDate={endDate}
            couponInfo={couponInfo}
          />
        ),
      };
    }

    let bookingStatus = bookingStatuses[status];
    if (status === 'awaiting admin') {
      bookingStatus = bookingStatuses.awaitingAdmin;
    }
    if (status === 'rejected by admin') {
      // toDo "is there a different wording for rejecting by admin?"
      bookingStatus = bookingStatuses.rejected;
    }

    return (
      <Wrapper>
        {/* PayNowModal should be wrapped in an Elements component in order to stripe api to work */}
        <Elements>
          <PayNowModal
            couponInfo={
              couponInfo.error ? { ...couponInfo, couponCode: '' } : couponInfo
            }
            bookingId={bookingInfo._id}
            paymentInfo={paymentInfo}
            visible={payNow}
            handlePayNowClick={this.handlePayNowClick}
          />
        </Elements>

        <ContentWrapper>
          <H4C mb="7">
            {bookingStatus.status === 'cancelled'
              ? 'booking cancelled'
              : 'booking request'}
          </H4C>
          {bookingStatus.status !== 'cancelled' && (
            <>
              <H6C mb="2" color="lightGray">
                status
              </H6C>
              <H5C color={bookingStatus.statusColor || 'blue'}>
                {bookingStatus.status}
              </H5C>
            </>
          )}
          {isLoading ? <Spin /> : bookingStatus.statusContentsComponent()}
        </ContentWrapper>
        {status !== 'cancelled' && status !== 'completed' && (
          <CancelBookingButton
            // this loads confirm cancellatiom page and sends user and booking infos
            onClick={() => {
              const { name } = this.props;
              const cancellingUserInfo = { id, name, role };
              const url = CANCELLATION_CONFIRM.replace(':id', bookingInfo._id);

              return this.props.history.push({
                pathname: url,
                state: { bookingInfo, cancellingUserInfo },
              });
            }}
          >
            cancel booking request
          </CancelBookingButton>
        )}
        <BookingDates
          price={price}
          startDate={startDate}
          endDate={endDate}
          intern
        />
      </Wrapper>
    );
  }
}
