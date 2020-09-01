import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Calendar from 'react-calendar/dist/entry.nostyle';
import moment from 'moment';
import axios from 'axios';
import { Spin, Modal, Checkbox, Popover } from 'antd';
import Icon from '../../Common/Icon';
import sendBookingRequest from '../../../helpers/sendBookingRequest';
import {
  calculateHostRespondingTime,
  createDatesArray,
  getDateRangeFromArray,
  calculatePriceByRange,
  formatPrice,
  createSingleDate,
  getDiscountDays,
  calculateDaysRange,
} from '../../../helpers';

// Typography
import * as T from '../../Common/Typography';
import { colors } from '../../../theme';
import Button from '../../Common/ButtonNew';
import CouponCode from '../../Common/CouponCode';
import { API_GET_INTERN_STATUS } from '../../../constants/apiRoutes';

import {
  CalendarWrapper,
  BookingRequestDetails,
  MessageContainer,
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

// messages
const inValidInternshipDates =
  "Your internship period doesn't match the selected dates";
const inValidCouponDates = (start, end) =>
  `This discount code is for an internship period from ${start} to ${end} which does not match the internship details you have entered. Please click here to update your internship details to complete your booking request or contact the organisation to get them to give you a new discount code`;

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
    listingActiveBookings: [],
    dates: new Date(),
    daysAmount: 0,
    isRangeSelected: false,
    price: 0,
    bursaryDiscount: null,
    bookingExists: false,
    message: '',
    messageType: '',
    isBooking: false,
    couponState: initialCouponState,
    internBursary: null,
    invalidBursary: false,
    couponInvalidDates: { invalid: false, startDate: null, endDate: null },
  };

  componentDidMount() {
    const {
      availableDates,
      bookingSearchDates,
      listingActiveBookings,
      bursaryData,
    } = this.props;

    const stateObj = {};

    if (bursaryData && bursaryData[0]) {
      [stateObj.internBursary] = bursaryData;
    }

    // if dates were selected in search set state accordingly
    if (bookingSearchDates) {
      stateObj.dates = bookingSearchDates;
      stateObj.price = calculatePriceByRange(
        moment.range(bookingSearchDates[0], bookingSearchDates[1]),
      );
      stateObj.daysAmout = createDatesArray(
        bookingSearchDates[0],
        bookingSearchDates[1],
      ).length;
      stateObj.isRangeSelected = true;
    }
    this.setState({
      ...stateObj,
    });
    this.refreshAvailableDates(availableDates);
    this.refreshlistingActiveBookings(listingActiveBookings);
  }

  // listens for prop changes to re-render calendar tiles
  componentDidUpdate(prevProps) {
    if (prevProps.availableDates !== this.props.availableDates) {
      this.refreshAvailableDates(this.props.availableDates);
    }
    if (prevProps.listingActiveBookings !== this.props.listingActiveBookings) {
      this.refreshlistingActiveBookings(this.props.listingActiveBookings);
    }
  }

  setCouponInvalidDates = (startDate, endDate) =>
    this.setState({
      couponInvalidDates: { startDate, endDate, invalid: true },
    });

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
  refreshlistingActiveBookings = dates => {
    let _listingActiveBookings;
    if (dates) {
      _listingActiveBookings = dates.reduce((acc, cur) => {
        const _dates = createDatesArray(cur.startDate, cur.endDate);
        acc.push(_dates);
        return [].concat(...acc);
      }, []);
    }
    this.setState({
      listingActiveBookings: _listingActiveBookings,
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
    const { internBursary } = this.state;
    const price = calculatePriceByRange(moment.range(dates[0], dates[1]));

    this.setState({
      dates,
      isRangeSelected: true,
      price,
      message: '',
      messageType: '',
      couponState: initialCouponState,
      bursaryDiscount: null,
      daysAmount:
        dates.length > 1 && createDatesArray(dates[0], dates[1]).length,
    });
    // check if booking exists and update state
    this.bookingFound(dates, internBookings);

    // check if bursary exists and update state
    if (internBursary && dates.length > 0) {
      this.applyBursary({ price, dates });
    }
  };

  setCouponState = couponState => this.setState({ couponState });

  // disables calendar tiles (days)
  tileDisabled = ({ date }) => {
    const { avDates, listingActiveBookings } = this.state;

    // return true if current date is not included in available dates => disable tile
    const _date = createSingleDate(date);

    return (
      !avDates.includes(_date) ||
      (listingActiveBookings && listingActiveBookings.includes(_date)) ||
      moment
        .utc()
        .startOf('day')
        .add(7, 'days')
        .isAfter(_date)
    ); // Block day tiles only
  };

  goToCompleteProfile = () => {
    this.props.history.push(INTERN_COMPLETE_PROFILE_URL);
  };

  goToUpdateInternship = () => {
    const { dates, price, couponInvalidDates } = this.state;

    const { listingId, hostId } = this.props;

    const searchParams = new URLSearchParams();
    searchParams.append('startDate', dates[0]);
    searchParams.append('endDate', dates[1]);
    searchParams.append('hostId', hostId);
    searchParams.append('price', price);
    searchParams.append('listing', listingId);
    searchParams.append('host', hostId);
    if (
      couponInvalidDates.invalid &&
      couponInvalidDates.startDate &&
      couponInvalidDates.endDate
    ) {
      searchParams.append('couponInvalidStart', couponInvalidDates.startDate);
      searchParams.append('couponInvalidEnd', couponInvalidDates.endDate);
    }
    this.props.history.push({
      pathname: BOOKINGS_INTERNSHIP_URL,
      search: searchParams.toString(),
    });
  };

  showAlertAndRedirectToProfile = message => {
    let onOk;
    let onCancel;

    if (message.includes('internship')) {
      onOk = this.goToUpdateInternship();
      onCancel = this.goToUpdateInternship();
    } else if (message.includes('complete your profile')) {
      onOk = this.goToCompleteProfile;
      onCancel = this.goToCompleteProfile;
    }
    Modal.warning({
      title: "Sorry! You can't make a request.",
      content: message,
      onOk,
      onCancel,
    });
  };

  // eslint-disable-next-line consistent-return
  handleClick = async () => {
    const { dates, price, couponState, internBursary } = this.state;
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
      approvedBursary: internBursary && internBursary._id,
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

      if (!isComplete) {
        message = 'You need to complete your profile';
      } else if (!validInternshipDates) {
        message = inValidInternshipDates;
      } else if (!verified) {
        message = "You can't make a request until you get verified";
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
            bursaryDiscount: null,
            couponState: initialCouponState,
          });

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
      const _selectedDates = createDatesArray(
        selectedDates[0],
        selectedDates[1],
      );
      bookingDatesFound = _selectedDates.some(date =>
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

  applyBursary = ({ price, dates }) => {
    const { internBursary = {} } = this.state;

    const {
      startDate: bursaryStart,
      endDate: bursaryEnd,
      londonWeighting,
      discountRate: bursaryDiscountRate,
      totalPotentialAmount,
      totalSpentSoFar,
    } = internBursary;

    // get discounted days by bursary
    const { discountDays: bursaryDiscountDays } = getDiscountDays({
      bookingStart: dates[0],
      bookingEnd: dates[1],
      couponStart: bursaryStart,
      couponEnd: bursaryEnd,
    });
    const noBookingDays = calculateDaysRange(dates[0], dates[1]);

    // check if bursary and booking dates are the same and inform user

    if (bursaryDiscountDays !== noBookingDays) {
      this.setState(prevState => ({
        ...prevState,
        bursaryDiscount: null,
        invalidBursary: true,
        messageType: 'error',
        message: `Your selected booking dates do not match with your approved bursary application ${createSingleDate(
          bursaryStart,
        )} - ${createSingleDate(bursaryEnd)}`,
      }));
    } else {
      // calculate bursary discount
      let bursaryDiscount = (price * bursaryDiscountRate) / 100;
      if (londonWeighting) {
        bursaryDiscount = (price * bursaryDiscountRate) / 100 + price * 0.2;
      }
      // get total left in bursary
      const availableBursary = totalPotentialAmount - totalSpentSoFar;
      // check if enough funds available - if not set remaining funds as discount
      if (availableBursary < bursaryDiscount) {
        bursaryDiscount = availableBursary;
      }

      this.setState(prevState => ({
        ...prevState,
        invalidBursary: false,
        bursaryDiscount,
        messageType: 'success',
        message: 'Your PressPad Bursary has been applied!',
      }));
    }
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

  renderPrice = price => {
    const { isMobile } = this.props;
    const { couponState, bursaryDiscount } = this.state;

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

    const { couponDiscount } = couponState;

    const _price = formatPrice(price);

    const validPrice = price > 0;
    const _newPrice = formatPrice(price - bursaryDiscount - couponDiscount);

    return (
      <>
        <DiscountPriceDetails>
          {isMobile
            ? pricingTypographies.priceMobile(_newPrice)
            : pricingTypographies.priceDesktop(_newPrice)}
          {validPrice &&
            _price !== _newPrice &&
            pricingTypographies.formerPrice(_price)}
        </DiscountPriceDetails>
      </>
    );
  };

  renderBookingDetails = () => {
    const {
      price,
      daysAmount: duration,
      couponState,
      internBursary: bursary,
      invalidBursary,
      bursaryDiscount,
    } = this.state;

    const { couponId, couponDiscount, couponError } = couponState;
    const { isMobile } = this.props;

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
              (validPrice && (discountExists || bursaryDiscount) ? (
                <T.PS>Discounted price for period:</T.PS>
              ) : (
                <T.PS>Full price for period:</T.PS>
              ))}
            {/* Price calculation */}
            {!isMobile &&
              (validPrice && (discountExists || bursaryDiscount) ? (
                <T.PL>Discounted price for period:</T.PL>
              ) : (
                <T.PL>Full price for period:</T.PL>
              ))}
          </Col>
          <Col value>{this.renderPrice(price)}</Col>
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
              disabled={invalidBursary}
              showAlertAndRedirectToProfile={this.showAlertAndRedirectToProfile}
              inValidCouponDates={inValidCouponDates}
              setCouponInvalidDates={this.setCouponInvalidDates}
              // send dynamic booking price with bursary included
              bookingPrice={
                bursaryDiscount > 0 ? price - bursaryDiscount : price
              }
              couponState={couponState}
              setCouponState={this.setCouponState}
              dates={this.state.dates}
              isMobile={isMobile}
              currentUserId={this.props.currentUserId}
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
      price,
      invalidBursary,
      bursaryDiscount,
    } = this.state;

    const {
      currentUserId,
      adminView,
      isMobile,
      respondedRequests,
      respondingTime,
    } = this.props;

    const { couponDiscount } = couponState;

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
          {this.renderBookingDetails()}
          {/* Bursary checkbox */}
          {!currentUserId && this.renderBursaryCheckbox(isMobile)}

          {/* Average Response Time */}
          <T.P>
            This host typically takes{' '}
            <strong>{hostRespondingTime || 7} days</strong> to respond to a
            booking request.
          </T.P>
          {message && (
            <MessageContainer>
              <Icon
                icon={messageType === 'error' ? 'alertTriangle' : 'circleTick'}
                color={messageType === 'error' ? 'red' : 'lightBlue'}
                width="30px"
              />
              <T.PXSBold
                style={{ marginLeft: '0.5rem' }}
                color={messageType === 'error' ? 'red' : 'lightBlue'}
              >
                {message}
              </T.PXSBold>
            </MessageContainer>
          )}

          <RequestBtnContainer>
            {isMobile ? (
              <T.PS>
                Price for period <br />{' '}
                <strong>
                  £{formatPrice(price - bursaryDiscount - couponDiscount)}
                </strong>
              </T.PS>
            ) : (
              <T.PL>
                Price for period <br />{' '}
                <strong>
                  £{formatPrice(price - bursaryDiscount - couponDiscount)}
                </strong>
              </T.PL>
            )}
            <Button
              small={isMobile}
              type="secondary"
              onClick={this.handleClick}
              disabled={
                !isRangeSelected ||
                bookingExists ||
                adminView ||
                isBooking ||
                invalidBursary
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
