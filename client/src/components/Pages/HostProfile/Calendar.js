import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Calendar from 'react-calendar/dist/entry.nostyle';
import moment from 'moment';
import axios from 'axios';
import { Spin, Alert, Modal } from 'antd';
import Icon from '../../Common/Icon';
import sendBookingRequest from '../../../helpers/sendBookingRequest';

import {
  createDatesArray,
  getDateRangeFromArray,
  calculatePrice,
} from '../../../helpers';

import { API_GET_INTERN_STATUS } from '../../../constants/apiRoutes';

import {
  CalendarWrapper,
  PricingDiv,
  PriceHeadline,
  PriceLabel,
  RequestBtn,
  ErrorDiv,
  PriceTopDiv,
} from './Calendar.style';

import {
  INTERN_COMPLETE_PROFILE_URL,
  BOOKINGS_INTERNSHIP_URL,
} from '../../../constants/navRoutes';

const inValidInternshipDates =
  "Your internship period doesn't match the selected dates";
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
    });
    // check if booking exists and update state
    this.bookingFound(dates, internBookings);
  };

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

  goToUpdateInternship = () => {
    const { dates, price } = this.state;

    const { listingId, hostId } = this.props;

    const searchParams = new URLSearchParams();
    searchParams.append('startDate', dates[0]);
    searchParams.append('endDate', dates[1]);
    searchParams.append('hostId', hostId);
    searchParams.append('price', price);
    searchParams.append('listing', listingId);
    searchParams.append('host', hostId);

    this.props.history.push({
      pathname: BOOKINGS_INTERNSHIP_URL,
      search: searchParams.toString(),
    });
  };

  showAlertAndRedirectToProfile = message => {
    Modal.warning({
      title: "Sorry! You can't make a request.",
      content: message,
      onOk:
        message === inValidInternshipDates
          ? this.goToUpdateInternship
          : this.goToCompleteProfile,
      onCancel:
        message === inValidInternshipDates
          ? this.goToUpdateInternship
          : this.goToCompleteProfile,
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
        data: { verified, isComplete, validInternshipDates },
      } = await axios.get(API_GET_INTERN_STATUS, {
        params: { startDate: dates[0], endDate: dates[1] },
      });
      if (!verified) {
        message = "You can't make a request until you get verified";
      } else if (!isComplete) {
        message = 'You need to complete your profile';
      } else if (!validInternshipDates) {
        message = inValidInternshipDates;
      }

      if (!verified || !isComplete || !validInternshipDates) {
        this.showAlertAndRedirectToProfile(message);
        this.setState({ message, messageType: 'error', isBooking: false });
      }

      if (verified && isComplete && validInternshipDates) {
        const { error } = await sendBookingRequest(data);
        if (!error) {
          this.setState({
            message: 'Booking request sent successfully',
            messageType: 'success',
            isBooking: false,
            dates: null,
            isRangeSelected: false,
            price: '0',
          });

          // update parent state
          getHostProfile();
        } else {
          this.setState({
            isBooking: false,
            messageType: 'error',
            message: error,
          });
        }
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

  render() {
    const {
      price,
      isRangeSelected,
      bookingExists,
      message,
      messageType,
      isLoading,
      isBooking,
    } = this.state;
    const { adminView, role } = this.props;
    if (isLoading) return <Spin tip="Loading Profile" />;

    return (
      <div>
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
        {role === 'intern' && (
          <PricingDiv>
            <PriceTopDiv>
              <PriceHeadline>Full price for period</PriceHeadline>
              <PriceLabel>£{price}</PriceLabel>
            </PriceTopDiv>
            {message && (
              <ErrorDiv>
                <Alert message={message} type={messageType} />
              </ErrorDiv>
            )}

            <RequestBtn
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
              Request Stay
            </RequestBtn>
          </PricingDiv>
        )}
      </div>
    );
  }
}
export default withRouter(CalendarComponent);
