import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Calendar from 'react-calendar/dist/entry.nostyle';
import moment from 'moment';
import axios from 'axios';
import { Spin, Alert, Modal, Checkbox, Popover } from 'antd';
import Icon from '../../Common/Icon';
import {
  createDatesArray,
  getDateRangeFromArray,
  calculatePrice,
} from '../../../helpers';

// Typography
import * as T from '../../Common/Typography';
import Button from '../../Common/ButtonNew';

import {
  API_BOOKING_REQUEST_URL,
  API_GET_INTERN_STATUS,
} from '../../../constants/apiRoutes';

import {
  CalendarWrapper,
  BookingRequestDetails,
  ErrorDiv,
  Row,
  Col,
  BursaryContainer,
  PopoverContentContainer,
  RequestBtnContainer,
} from './Calendar.style';

import { INTERN_COMPLETE_PROFILE_URL } from '../../../constants/navRoutes';

import CouponCode from '../../Common/CouponCode';

const bookingRequest = (url, data) => axios.post(url, data);

class CalendarComponent extends Component {
  state = {
    isLoading: true,
    avDates: [],
    dates: new Date(),
    isRangeSelected: false,
    price: 0,
    bookingExists: false,
    message: '',
    messageType: '',
    isBooking: false,
    couponState: {
      discountDays: 0,
      discountRate: 0,
      couponDiscount: 0,
      couponError: '',
      isCouponLoading: false,
      code: '',
    },
  };

  componentDidMount() {
    const { availableDates } = this.props;

    this.refreshAvailableDates(availableDates);
  }

  // listens for prop changes to re-render calendar tiles
  componentDidUpdate(prevProps) {
    if (prevProps.availableDates !== this.props.availableDates) {
      this.refreshAvailableDates(this.props.availableDates);
    }
  }

  // converts and refreshes available listing dates
  refreshAvailableDates = dates => {
    let avDateRange;
    if (dates) {
      avDateRange = getDateRangeFromArray(dates);
    }
    this.setState({
      avDates: avDateRange || [],
      isLoading: false,
    });
  };

  // to disable "Request Stay" button when the user starts to select a range
  onDayClick = () => {
    this.setState({ isRangeSelected: false, message: '' });
  };

  // updates state
  onChange = dates => {
    const { internBookings } = this.props;

    this.setState({
      dates,
      isRangeSelected: true,
      price: calculatePrice(moment.range(dates[0], dates[1])),
      message: '',
      messageType: '',
      bursary: false,
    });
    // check if booking exists and update state
    this.bookingFound(dates, internBookings);
  };

  setCouponState = couponState => this.setState({ couponState });

  // disables calendar tiles (days)
  tileDisabled = ({ date }) => {
    const { avDates } = this.state;
    // return true if current date is not included in available dates => disable tile
    date = moment(date).format('YYYY-MM-DD');
    return (
      !avDates.includes(date) ||
      moment
        .utc()
        .startOf('day')
        .add(7, 'days')
        .isAfter(date)
    ); // Block day tiles only
  };

  goToCompleteProfile = () => {
    this.props.history.push(INTERN_COMPLETE_PROFILE_URL);
  };

  showAlertAndRedirectToProfile = message => {
    Modal.warning({
      title: "Sorry! You can't make a request.",
      content: message,
      onOk: this.goToCompleteProfile,
      onCancel: this.goToCompleteProfile,
    });
  };

  handleClick = async () => {
    const { dates, price } = this.state;
    const { currentUserId, listingId, hostId, getHostProfile } = this.props;
    const data = {
      listing: listingId,
      intern: currentUserId,
      host: hostId,
      startDate: moment(dates[0]).format('YYYY-MM-DD'),
      endDate: moment(dates[1]).format('YYYY-MM-DD'),
      price,
    };

    let message = '';
    try {
      this.setState({ isBooking: true, message: '' });
      const {
        data: { verified, isComplete },
      } = await axios.get(API_GET_INTERN_STATUS);

      if (!verified) {
        message = "You can't make a request until you get verified";
      } else if (!isComplete) {
        message = 'You need to complete your profile';
      }

      if (!verified || !isComplete) {
        this.showAlertAndRedirectToProfile(message);
        this.setState({ message, messageType: 'error', isBooking: false });
      }

      if (verified && isComplete) {
        bookingRequest(API_BOOKING_REQUEST_URL, data)
          .then(() => {
            this.setState({
              message: 'Booking request sent successfully',
              messageType: 'success',
              isBooking: false,
              dates: null,
              isRangeSelected: false,
              price: '0',
            });
            Modal.success({
              title: 'Done!',
              content: 'your booking successfully sent',
            });
            // update parent state
            getHostProfile();
          })
          .catch(error => {
            const serverError = error.response && error.response.data.error;

            let errorMsg;

            if (
              serverError ===
              'user has already a booking request for those dates'
            ) {
              errorMsg =
                'It seems like you have already requested a booking during those dates. You can only make one request at a time.';
            } else if (
              serverError === 'listing is not available during those dates'
            ) {
              errorMsg =
                'Unfortunately this listing is not fully available during your requested booking dates.';
            } else {
              errorMsg = serverError;
            }

            this.setState({
              isBooking: false,
              messageType: 'error',
              message: errorMsg,
            });
          });
      }
    } catch (err) {
      if (err && err.response && err.response.status === 404) {
        const errorMessage =
          'You need to have a profile in order to be able to book stay';

        this.showAlertAndRedirectToProfile(errorMessage);
        this.setState({
          isBooking: false,
          messageType: 'error',
          message: errorMessage,
        });
      }
    }
  };

  bookingFound = (selectedDates, existingBookingDates) => {
    let bookingDatesFound;
    if (selectedDates.length > 0) {
      selectedDates = createDatesArray(selectedDates[0], selectedDates[1]);
      bookingDatesFound = selectedDates.some(date =>
        existingBookingDates.includes(date),
      );
    } else bookingDatesFound = false;
    // if no booking selected or dates are already part of exiting user bookings
    // disable request btn
    return bookingDatesFound
      ? this.setState({
          bookingExists: true,
          messageType: 'error',
          message:
            'It seems like you have already requested a booking during those dates. You can only make one request at a time.',
        })
      : this.setState({ bookingExists: false });
  };

  // host checkbox function
  onCheckboxChange = e =>
    e.target.checked
      ? this.setState({
          bursary: true,
        })
      : this.setState({
          bursary: false,
        });

  renderBookingDetails = (isMobile, price, duration, couponState) => (
    <>
      <Row>
        <Col>
          {isMobile ? (
            <T.PS>Selected Duration:</T.PS>
          ) : (
            <T.PL>Selected Duration:</T.PL>
          )}
        </Col>
        <Col value>
          {isMobile ? (
            <T.PSBold>{duration > 0 ? duration : 0} days</T.PSBold>
          ) : (
            <T.H4>{duration > 0 ? duration : 0} days</T.H4>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          {isMobile ? (
            <T.PS>Full price for period:</T.PS>
          ) : (
            <T.PL>Full price for period:</T.PL>
          )}
        </Col>
        <Col value>
          {isMobile ? <T.PSBold>{price}£</T.PSBold> : <T.H4>{price}£</T.H4>}
        </Col>
      </Row>
      <Row>
        <Col>
          <Popover
            content="Dummy content for now ..."
            title="Discount Codes"
            trigger="click"
          >
            <PopoverContentContainer>
              {isMobile ? (
                <T.PS>Discount Code:</T.PS>
              ) : (
                <T.PL>Discount Code:</T.PL>
              )}
              <Icon icon="questionCircle" width="24px" height="24px" />
            </PopoverContentContainer>
          </Popover>
        </Col>
        <Col value>
          <CouponCode
            bookingPrice={price}
            couponState={couponState}
            setCouponState={this.setCouponState}
            dates={this.state.dates}
          />
        </Col>
      </Row>
    </>
  );

  renderBursaryCheckbox = isMobile => (
    <BursaryContainer>
      <Checkbox
        style={{ paddingRight: '1rem' }}
        name="checkbox"
        onChange={e => this.onCheckboxChange(e)}
      />

      <Popover
        content="Dummy content for now ..."
        title="Presspad Bursary"
        trigger="click"
      >
        <PopoverContentContainer>
          {isMobile ? (
            <T.PS>
              Apply for a <strong> Presspad Bursary </strong>
            </T.PS>
          ) : (
            <T.PL>
              Apply for a <strong> Presspad Bursary </strong>
            </T.PL>
          )}
          <Icon icon="questionCircle" width="24px" height="24px" />
        </PopoverContentContainer>
      </Popover>
    </BursaryContainer>
  );

  render() {
    const {
      price,
      isRangeSelected,
      bookingExists,
      message,
      messageType,
      isLoading,
      isBooking,
      dates,
      couponState,
    } = this.state;

    const { currentUserId, adminView, role, isMobile } = this.props;

    const couponPrice = (couponState.couponDiscount / 100).toFixed(2);

    const days =
      dates.length > 1 && createDatesArray(dates[0], dates[1]).length;

    if (isLoading) return <Spin tip="Loading Profile" />;

    return (
      <>
        <CalendarWrapper>
          <Calendar
            prev2Label={null}
            next2Label={null}
            tileDisabled={this.tileDisabled}
            onChange={this.onChange}
            onClickDay={this.onDayClick}
            value={this.state.date}
            locale="en-t-jp"
            maxDetail="month"
            minDetail="month"
            selectRange
            formatShortWeekday={(locale, value) =>
              ['S', 'M', 'T', 'W', 'T', 'F', 'S'][moment(value).day()]
            }
          />
        </CalendarWrapper>
        {/* Booking details */}
        {role === 'intern' && (
          <BookingRequestDetails>
            {this.renderBookingDetails(isMobile, price, days, couponState)}
            {/* Bursary checkbox */}
            {!currentUserId && this.renderBursaryCheckbox(isMobile)}

            {/* Average Response Time */}
            <T.P>
              This host typically takes <strong>3 days</strong> to respond to a
              booking request.
            </T.P>
            {message && (
              <ErrorDiv>
                <Alert message={message} type={messageType} />
              </ErrorDiv>
            )}
            <RequestBtnContainer>
              {isMobile ? (
                <T.PS>
                  Price for period <br />{' '}
                  <strong>{price > 0 ? price - couponPrice : 0}£</strong>
                </T.PS>
              ) : (
                <T.PL>
                  Price for period <br />{' '}
                  <strong>{price > 0 ? price - couponPrice : 0}£</strong>
                </T.PL>
              )}
              <Button
                small={isMobile}
                type="secondary"
                onClick={this.handleClick}
                disabled={
                  !isRangeSelected || bookingExists || adminView || isBooking
                }
              >
                <Spin
                  spinning={isBooking}
                  indicator={
                    <Icon
                      icon="loading"
                      style={{
                        fontSize: 24,
                        marginRight: '8px',
                        color: 'white',
                      }}
                    />
                  }
                />
                {currentUserId ? 'REQUEST TO STAY' : 'SIGN UP TO STAY HERE'}
              </Button>
            </RequestBtnContainer>
          </BookingRequestDetails>
        )}
      </>
    );
  }
}
export default withRouter(CalendarComponent);
