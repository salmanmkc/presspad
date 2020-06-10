import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Calendar from 'react-calendar/dist/entry.nostyle';
import moment from 'moment';
import axios from 'axios';
import { Spin, Alert, Modal, Checkbox, Popover } from 'antd';
import Icon from '../../Common/Icon';
import sendBookingRequest from '../../../helpers/sendBookingRequest';
import {
  calculateHostRespondingTime,
  createDatesArray,
  getDateRangeFromArray,
  calculatePrice,
} from '../../../helpers';

// Typography
import * as T from '../../Common/Typography';
import { colors } from '../../../theme';
import Button from '../../Common/ButtonNew';

import { API_GET_INTERN_STATUS } from '../../../constants/apiRoutes';

import {
  CalendarWrapper,
  BookingRequestDetails,
  ErrorDiv,
  Row,
  Col,
  BursaryContainer,
  PopoverContentContainer,
  RequestBtnContainer,
  DiscountPriceDetails,
} from './Calendar.style';

import {
  INTERN_COMPLETE_PROFILE_URL,
  BOOKINGS_INTERNSHIP_URL,
  SIGNUP_INTERN,
} from '../../../constants/navRoutes';

import CouponCode from '../../Common/CouponCode';

const inValidInternshipDates =
  "Your internship period doesn't match the selected dates";

const initialCouponState = {
  discountRate: 0,
  couponDiscount: 0,
  couponError: '',
  isCouponLoading: false,
  code: '',
  couponId: '',
};
class CalendarComponent extends Component {
  state = {
    isLoading: true,
    avDates: [],
    listingConfirmedBookings: [],
    dates: new Date(),
    daysAmount: 0,
    isRangeSelected: false,
    price: 0,
    bookingExists: false,
    message: '',
    messageType: '',
    isBooking: false,
    couponState: initialCouponState,
  };

  componentDidMount() {
    const {
      availableDates,
      bookingSearchDates,
      listingConfirmedBookings,
    } = this.props;

    // if dates were selected in search set state accordingly
    if (bookingSearchDates) {
      this.setState({
        dates: bookingSearchDates,
        price: calculatePrice(
          moment.range(bookingSearchDates[0], bookingSearchDates[1]),
        ),
        daysAmount: createDatesArray(
          bookingSearchDates[0],
          bookingSearchDates[1],
        ).length,
        isRangeSelected: true,
      });
    }
    this.refreshAvailableDates(availableDates);
    this.refreshListingConfirmedBookings(listingConfirmedBookings);
  }

  // listens for prop changes to re-render calendar tiles
  componentDidUpdate(prevProps) {
    if (prevProps.availableDates !== this.props.availableDates) {
      this.refreshAvailableDates(this.props.availableDates);
    } else if (
      prevProps.listingConfirmedBookings !== this.props.listingConfirmedBookings
    ) {
      this.refreshListingConfirmedBookings(this.props.listingConfirmedBookings);
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

  // adds and refreshes confirmed bookings for listing
  refreshListingConfirmedBookings = dates => {
    let _listingConfirmedBookings;
    if (dates) {
      _listingConfirmedBookings = dates.reduce((acc, cur) => {
        const _dates = createDatesArray(cur.startDate, cur.endDate);
        acc.push(_dates);
        return [].concat(...acc);
      }, []);
    }
    this.setState({
      listingConfirmedBookings: _listingConfirmedBookings,
      loading: false,
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
      daysAmount:
        dates.length > 1 && createDatesArray(dates[0], dates[1]).length,
    });
    // check if booking exists and update state
    this.bookingFound(dates, internBookings);
  };

  setCouponState = couponState => this.setState({ couponState });

  // disables calendar tiles (days)
  tileDisabled = ({ date }) => {
    const { avDates, listingConfirmedBookings } = this.state;

    // return true if current date is not included in available dates => disable tile
    date = moment(date).format('YYYY-MM-DD');
    return (
      !avDates.includes(date) ||
      (listingConfirmedBookings && listingConfirmedBookings.includes(date)) ||
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
    const { dates, price, couponState } = this.state;
    const {
      currentUserId,
      listingId,
      hostId,
      getHostProfile,
      setProfileData,
      history,
    } = this.props;

    if (!currentUserId) return history.push(SIGNUP_INTERN);

    const data = {
      listing: listingId,
      intern: currentUserId,
      host: hostId,
      startDate: moment(dates[0]).format('YYYY-MM-DD'),
      endDate: moment(dates[1]).format('YYYY-MM-DD'),
      price,
      couponId: couponState.couponId,
    };

    let message = '';
    try {
      this.setState({ isBooking: true, message: '' });
      // check if profile is verified
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
            dates: new Date(),
            isRangeSelected: false,
            price: '0',
          });
          // update coupon state
          this.setCouponState(initialCouponState);
          // update parent state
          getHostProfile(this.props).then(({ profileData }) =>
            setProfileData(profileData),
          );
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

  // host checkbox function
  onCheckboxChange = e =>
    e.target.checked
      ? this.setState({
          bursary: true,
        })
      : this.setState({
          bursary: false,
        });

  renderPrice = (isMobile, price, couponState, bursary) => {
    const pricingTypographies = {
      priceMobile: content => <T.PSBold>£{content}</T.PSBold>,
      priceDesktop: content => <T.PBold>£{content}</T.PBold>,
      formerPrice: content => (
        <T.PXSBold
          style={{
            color: colors.gray,
            textDecoration: 'line-through',
            marginLeft: isMobile ? '-1.25rem' : '1rem',
          }}
        >
          £{content}
        </T.PXSBold>
      ),
    };

    const { couponError, couponId, couponDiscount } = couponState;
    const discountExists =
      (!couponError && couponId && couponDiscount > 0) || bursary;
    const validPrice = price > 0;

    if (validPrice && discountExists) {
      return (
        <DiscountPriceDetails>
          {isMobile
            ? pricingTypographies.priceMobile(
                bursary ? 0 : price - couponDiscount,
              )
            : pricingTypographies.priceDesktop(
                bursary ? 0 : price - couponDiscount,
              )}
          {pricingTypographies.formerPrice(price)}
        </DiscountPriceDetails>
      );
    }
    return isMobile
      ? pricingTypographies.priceMobile(price)
      : pricingTypographies.priceDesktop(price);
  };

  renderBookingDetails = (isMobile, price, duration, couponState, bursary) => {
    const { couponId, couponDiscount, couponError } = couponState;

    const discountExists =
      (!couponError && couponId && couponDiscount > 0) || bursary;
    const validPrice = price > 0;
    return (
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
            {isMobile &&
              (validPrice && discountExists ? (
                <T.PS>Discounted price for period:</T.PS>
              ) : (
                <T.PS>Full price for period:</T.PS>
              ))}
            {/* Price calculation */}
            {!isMobile &&
              (validPrice && discountExists ? (
                <T.PL>Discounted price for period:</T.PL>
              ) : (
                <T.PL>Full price for period:</T.PL>
              ))}
          </Col>
          <Col value>
            {this.renderPrice(isMobile, price, couponState, bursary)}
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
              bursary={this.state.bursary}
              bookingPrice={price}
              couponState={couponState}
              setCouponState={this.setCouponState}
              dates={this.state.dates}
              isMobile={isMobile}
              currentUserId={this.currentUserId}
            />
          </Col>
        </Row>
      </>
    );
  };

  renderBursaryCheckbox = isMobile => (
    <BursaryContainer>
      <Checkbox
        style={{ paddingRight: '1rem' }}
        name="checkbox"
        onChange={this.onCheckboxChange}
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
      isRangeSelected,
      bookingExists,
      message,
      messageType,
      isLoading,
      isBooking,
      couponState,
      dates,
      daysAmount,
      price,
      bursary,
    } = this.state;

    const {
      currentUserId,
      adminView,
      isMobile,
      respondedRequests,
      respondingTime,
    } = this.props;

    const { couponDiscount, couponError } = couponState;

    const hostRespondingTime = calculateHostRespondingTime(
      respondingTime,
      respondedRequests,
    );

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
            value={this.state.date || (dates.length && dates)}
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
        <BookingRequestDetails>
          {this.renderBookingDetails(
            isMobile,
            price,
            daysAmount,
            couponState,
            bursary,
          )}
          {/* Bursary checkbox */}
          {!currentUserId && this.renderBursaryCheckbox(isMobile)}

          {/* Average Response Time */}
          <T.P>
            This host typically takes{' '}
            <strong>{hostRespondingTime || 7} days</strong> to respond to a
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
                <strong>
                  £
                  {bursary
                    ? 0
                    : (!couponError && price - couponDiscount) || price}
                </strong>
              </T.PS>
            ) : (
              <T.PL>
                Price for period <br />{' '}
                <strong>
                  £
                  {bursary
                    ? 0
                    : (!couponError && price - couponDiscount) || price}
                </strong>
              </T.PL>
            )}

            <Button
              small={isMobile}
              type="secondary"
              onClick={this.handleClick}
              disabled={
                !isRangeSelected || bookingExists || adminView || isBooking
              }
              label={currentUserId ? 'REQUEST TO STAY' : 'SIGN UP TO STAY HERE'}
              loading={isBooking}
            />
          </RequestBtnContainer>
        </BookingRequestDetails>
      </>
    );
  }
}
export default withRouter(CalendarComponent);
