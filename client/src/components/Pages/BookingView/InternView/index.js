/* eslint-disable consistent-return */
import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { message, Spin } from 'antd';
import { Elements } from 'react-stripe-elements';

import {
  createInstallments,
  getFirstUnpaidInstallment,
  createUpdatedNewInstallments,
} from '../helpers';

import {
  getDiscountDays,
  // calculatePrice,
  calculateHostRespondingTime,
  calculateDaysRange,
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
  AwaitingCancellationContent,
  CancelledContent,
  CancelledAfterPaymentContent,
  AutomaticCancelledContent,
} from './statusContents';

import {
  API_COUPON_URL,
  API_HOST_PROFILE_URL,
  API_GET_INTERN_BURSARY_APPLICATION,
} from '../../../../constants/apiRoutes';
import {
  Error404,
  Error500,
  CANCELLATION_CONFIRM,
} from '../../../../constants/navRoutes';

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
    bursaryDiscount: 0,
  };

  async componentDidMount() {
    const { bookingInfo } = this.props;

    this.setState({ isLoading: true });

    const hostInfoURL = API_HOST_PROFILE_URL.replace(
      ':id',
      bookingInfo.host._id,
    );

    try {
      const [profileData, bursaryData] = await Promise.all([
        axios.get(hostInfoURL),
        axios.get(API_GET_INTERN_BURSARY_APPLICATION),
      ]);

      const {
        data: { listing, reviews, profile },
      } = profileData;
      const { data: bursaryApplications } = bursaryData;

      const filteredBursary = bursaryApplications.filter(
        el => el._id === bookingInfo.approvedBursary,
      );

      const {
        discountRate: bursaryDiscountRate = 0,
        londonWeighting = false,
        totalPotentialAmount = 0,
        totalSpentSoFar = 0,
      } = filteredBursary.length && filteredBursary[0];

      let bursaryDiscount = (bookingInfo.price * bursaryDiscountRate) / 100;
      if (londonWeighting) {
        bursaryDiscount =
          (bookingInfo.price * bursaryDiscountRate) / 100 +
          bookingInfo.price * 0.2;
      }
      // get total left in bursary
      const availableBursary = totalPotentialAmount - totalSpentSoFar;
      // check if enough funds available - if not set remaining funds as discount
      if (availableBursary < bursaryDiscount) {
        bursaryDiscount = availableBursary;
      }

      this.setState({
        isLoading: false,
        listing,
        profile,
        reviews,
        bursaryDiscount,
      });
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
    const { bursaryDiscount } = this.state;

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
              bookingInfo: {
                startDate,
                endDate,
                status,
                installments,
                price: bookingPrice,
              },
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

            // get number of booking days
            const noBookingDays = calculateDaysRange(startDate, endDate);

            if (noBookingDays !== discountDays) {
              this.setState(prevState => ({
                couponInfo: {
                  ...prevState.couponInfo,
                  isCouponLoading: false,
                  error:
                    'This discount code does not match your internship details. Please contact the organisation to get them to give you a new discount code.',
                  couponDiscount: 0,
                },
              }));
            } else {
              let remainingPrice;
              let couponDiscount;
              if (bursaryDiscount > 0) {
                remainingPrice = bookingPrice - bursaryDiscount;
              } else {
                remainingPrice = bookingPrice;
              }

              couponDiscount = (bookingPrice * discountRate) / 100;

              if (remainingPrice < couponDiscount) {
                couponDiscount = remainingPrice;
              }

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
            }
          } catch (error) {
            let errorMsg = 'something went wrong';
            if (error.response && error.response.status === 404) {
              errorMsg = 'wrong code ..';
            }
            if (error.response && error.response.data.error) {
              errorMsg = error.response.data.error;
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
      bursaryDiscount,
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
      paidAmount,
      startDate,
      endDate,
      status,
      rejectReason,
      _id: bookingId,
      cancellationDetails,
    } = bookingInfo;

    const bookingDays = moment(endDate).diff(startDate, 'd') + 1;

    if (!installments[0]) {
      newInstallments = createInstallments({
        startDate,
        endDate,
        upfront,
        couponInfo,
        bursaryDiscount,
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
      awaitingCancellation: {
        status: 'under review',
        statusColor: 'pink',
        statusContentsComponent: () => <AwaitingCancellationContent />,
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
      automaticCancelled: {
        status: 'cancelled',
        statusColor: 'pink',
        statusContentsComponent: () => (
          <AutomaticCancelledContent hostName={host.name} />
        ),
      },
      cancelledAfterPayment: {
        status: 'cancelled',
        statusColor: 'pink',
        statusContentsComponent: () => (
          <CancelledAfterPaymentContent hostName={host.name} />
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
            bursaryDiscount={bursaryDiscount}
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
            bursaryDiscount={bursaryDiscount}
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
    if (
      [
        'cancelled',
        'cancelled after payment',
        'awaiting cancellation',
      ].includes(status) &&
      cancellationDetails.automaticCancellation
    ) {
      bookingStatus = bookingStatuses.automaticCancelled;
    } else if (status === 'awaiting admin') {
      bookingStatus = bookingStatuses.awaitingAdmin;
    } else if (status === 'rejected by admin') {
      // toDo "is there a different wording for rejecting by admin?"
      bookingStatus = bookingStatuses.rejected;
    } else if (status === 'awaiting cancellation') {
      bookingStatus = bookingStatuses.awaitingCancellation;
    } else if (status === 'cancelled after payment') {
      bookingStatus = bookingStatuses.cancelledAfterPayment;
    }

    const decideHeadline = _status => {
      switch (_status) {
        case 'under review':
          return 'cancellation request';
        case 'cancelled':
        case 'cancelled after payment':
          return 'booking cancelled';
        default:
          return 'booking request';
      }
    };
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
          bursaryDiscount={bursaryDiscount}
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
            bursaryDiscount={bursaryDiscount}
          />
        </Elements>

        <ContentWrapper>
          <H4C mb="7">{decideHeadline(bookingStatus.status)}</H4C>

          <H6C mb="2" color="lightGray">
            status
          </H6C>
          <H5C color={bookingStatus.statusColor || 'blue'}>
            {bookingStatus.status}
          </H5C>

          {isLoading ? <Spin /> : bookingStatus.statusContentsComponent()}
        </ContentWrapper>
        {![
          'cancelled',
          'cancelled after payment',
          'completed',
          'awaiting cancellation',
        ].includes(status) && (
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
          paidSoFar={paidAmount}
          price={price}
          startDate={startDate}
          endDate={endDate}
          intern
        />
      </Wrapper>
    );
  }
}
