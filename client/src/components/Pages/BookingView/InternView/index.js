/* eslint-disable consistent-return */
import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { message, Spin } from 'antd';
import { Elements } from 'react-stripe-elements';

import {
  getDiscountDays,
  createInstallments,
  getFirstUnpaidInstallment,
  createUpdatedNewInstallments,
} from '../helpers';

import {
  calculatePrice,
  calculateHostRespondingTime,
  formatPrice,
} from '../../../../helpers';

import { H4C, H5C, H6C } from '../../../Common/Typography';

import BookingDates from '../../../Common/BookingDetailsBox';
import CancelBookingButton from '../CancelBookingButton';

import PayNowModal from './PayNowModal';
import ConfirmWithoutPayModal from './ConfirmWithoutPayModal';
import { Wrapper, ContentWrapper } from './InternView.style';
import {
  WaitingContent,
  AcceptedContent,
  RejectedContent,
  ConfirmedContent,
  PaymentDueContent,
  CompletedContent,
} from './statusContents';

import {
  API_COUPON_URL,
  API_HOST_PROFILE_URL,
} from '../../../../constants/apiRoutes';
import { Error404, Error500 } from '../../../../constants/navRoutes';

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
    withoutPay: false,
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
          discountDays: 0,
          discountRate: 0,
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
            discountDays: 0,
            discountRate: 0,
            couponDiscount: 0,
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
              bookingInfo: { startDate, endDate, status, installments },
            } = this.props;

            const {
              startDate: couponStart,
              endDate: couponEnd,
              discountRate,
              usedDays,
              usedAmount,
              reservedAmount,
            } = couponInfo;

            const firstUnpaidInstallment = getFirstUnpaidInstallment(
              installments,
            );

            const installmentDate =
              status === 'confirmed'
                ? firstUnpaidInstallment.dueDate
                : undefined;

            const { discountDays } = getDiscountDays({
              bookingStart: startDate,
              bookingEnd: endDate,
              installmentDate,
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

  handleConfirmWithoutPayClick = withoutPay => this.setState({ withoutPay });

  handlePaymentMethod = upfront => this.setState({ upfront });

  render() {
    const { bookingInfo, role, id } = this.props;
    const { installments, host, coupon: usedCoupon } = bookingInfo;

    const hostRespondingTime =
      host &&
      calculateHostRespondingTime(host.respondingTime, host.respondedRequests);

    const {
      isLoading,
      profile,
      listing,
      couponInfo,
      payNow,
      withoutPay,
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

    const bookingDays = moment(endDate).diff(startDate, 'd') + 1;

    if (!installments[0]) {
      newInstallments = createInstallments({
        startDate,
        endDate,
        upfront,
        couponInfo,
        bookingDays,
      });
    }

    let paymentInfo = installments[0]
      ? firstUnpaidInstallment
      : newInstallments;

    const updatedInstallments =
      installments[0] &&
      createUpdatedNewInstallments({ installments, couponInfo });

    if (updatedInstallments) {
      paymentInfo = getFirstUnpaidInstallment(updatedInstallments);
    }

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
      // toDo "When we get more about cancelled bookings"
      // maybe there should be a different view for cancelled bookings?
      // or the intern shouldn't see them?
      cancelled: {
        status: 'rejected',
        statusColor: 'pink',
        statusContentsComponent: () => (
          <RejectedContent rejectReason={rejectReason} />
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
            handleConfirmWithoutPayClick={this.handleConfirmWithoutPayClick}
            handlePaymentMethod={this.handlePaymentMethod}
            handleCouponChange={this.handleCouponChange}
            upfront={upfront}
            bookingDays={bookingDays}
            paymentInfo={paymentInfo}
            price={price}
            startDate={startDate}
            endDate={endDate}
            couponInfo={couponInfo}
            usedCoupon={usedCoupon}
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
            handlePayNowClick={this.handlePayNowClick}
            handleConfirmWithoutPayClick={this.handleConfirmWithoutPayClick}
            handlePaymentMethod={this.handlePaymentMethod}
            handleCouponChange={this.handleCouponChange}
            upfront={upfront}
            bookingDays={bookingDays}
            paymentInfo={paymentInfo}
            installments={installments}
            updatedInstallments={updatedInstallments}
            price={price}
            startDate={startDate}
            endDate={endDate}
            couponInfo={couponInfo}
            usedCoupon={usedCoupon}
          />
        ),
      },
    };

    if (
      status === 'confirmed' &&
      firstUnpaidInstallment &&
      moment().isSameOrAfter(firstUnpaidInstallment.dueDate, 'day')
    ) {
      const dueToday = moment()
        .subtract(6, 'd')
        .startOf('d')
        .isSameOrBefore(
          moment(firstUnpaidInstallment.dueDate).startOf('d'),
          'd',
        );

      bookingStatuses.confirmed = {
        status: dueToday ? 'payment due' : 'payment overdue!',
        statusColor: 'pink',
        statusContentsComponent: () => (
          <PaymentDueContent
            hostId={host._id}
            hostInfo={hostInfo}
            isLoading={isLoading}
            userRole={role}
            handlePayNowClick={this.handlePayNowClick}
            handleConfirmWithoutPayClick={this.handleConfirmWithoutPayClick}
            handleCouponChange={this.handleCouponChange}
            paymentInfo={paymentInfo}
            price={price}
            startDate={startDate}
            endDate={endDate}
            couponInfo={couponInfo}
            installments={installments}
            updatedInstallments={updatedInstallments}
            usedCoupon={usedCoupon}
            bookingDays={bookingDays}
            dueToday={dueToday}
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
        <ConfirmWithoutPayModal
          handleConfirmWithoutPayClick={this.handleConfirmWithoutPayClick}
          paymentInfo={paymentInfo}
          updatedInstallments={updatedInstallments}
          couponInfo={
            couponInfo.error ? { ...couponInfo, couponCode: '' } : couponInfo
          }
          bookingId={bookingInfo._id}
          visible={withoutPay}
        />
        <Elements>
          <PayNowModal
            couponInfo={
              couponInfo.error ? { ...couponInfo, couponCode: '' } : couponInfo
            }
            bookingId={bookingInfo._id}
            paymentInfo={paymentInfo}
            updatedInstallments={updatedInstallments}
            visible={payNow}
            handlePayNowClick={this.handlePayNowClick}
          />
        </Elements>
        <ContentWrapper>
          <H4C mb="5">booking request</H4C>
          <H6C mb="2" color="lightGray">
            status
          </H6C>
          <H5C color={bookingStatus.statusColor || 'blue'}>
            {bookingStatus.status}
          </H5C>
          {isLoading ? <Spin /> : bookingStatus.statusContentsComponent()}
        </ContentWrapper>
        {status !== 'cancelled' && status !== 'completed' && (
          // toDo handle cancel booking button
          <CancelBookingButton
            onClick={() => console.log('cancle booking query to go here')}
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
  }
}
