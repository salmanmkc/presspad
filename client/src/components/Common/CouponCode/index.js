import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Input } from 'antd';

import {
  API_COUPON_URL,
  API_COUPON_SOFT_URL,
} from '../../../constants/apiRoutes';

import {
  getDiscountDays,
  calculateDaysRange,
  createSingleDate,
} from '../../../helpers';

// Typography
import * as T from '../Typography';

import { colors } from '../../../theme';

// checks db with code
const makeRequest = async (_code, userId) => {
  try {
    const {
      data: {
        data: [couponInfo],
      },
    } = await axios.get(
      `${userId ? API_COUPON_URL : API_COUPON_SOFT_URL}?code=${_code}`,
    );

    return { couponInfo };
  } catch (error) {
    let errorMsg = 'something went wrong';
    if (error.response && error.response.status === 404) {
      errorMsg = 'INVALID CODE';
    }
    if (error.response && error.response.data.error) {
      errorMsg = error.response.data.error;
    }
    return { apiError: errorMsg };
  }
};

const initialCouponState = {
  discountDays: 0,
  discountRate: 0,
  couponDiscount: 0,
  couponError: '',
  isCouponLoading: false,
  code: '',
  couponId: '',
};

// calculates relevant details for coupon usage
const checkCouponCode = async ({
  _code = '',
  _dates = '',
  _bookingPrice = '',
  userId = '',
  showAlertAndRedirectToProfile = () => {},
  inValidCouponDates = () => {},
  setCouponInvalidDates = () => {},
}) => {
  const { couponInfo, apiError } = await makeRequest(_code, userId);
  let couponDiscount;
  let newCouponState;

  if (couponInfo) {
    const {
      startDate: couponStart,
      endDate: couponEnd,
      discountRate: _discountRate,
      usedDays,
      usedAmount,
      reservedAmount,
      _id: couponId,
    } = couponInfo;

    // calculate discount days which is the intersection of booking and coupon dates
    const { discountDays: _discountDays } = getDiscountDays({
      bookingStart: _dates[0],
      bookingEnd: _dates[1],
      couponStart,
      couponEnd,
      usedDays,
    });

    // get number of booking days
    const noBookingDays = calculateDaysRange(_dates[0], _dates[1]);

    // for logged in users:
    // check if valid discounted days are equal to booking days => if not prompt to update internship
    if (userId && noBookingDays !== _discountDays) {
      newCouponState = {
        ...initialCouponState,
        code: _code,
        couponError: 'Coupon dates do not match internship dates',
      };
      setCouponInvalidDates(couponStart, couponEnd);
      showAlertAndRedirectToProfile(
        inValidCouponDates(
          createSingleDate(couponStart),
          createSingleDate(couponEnd),
        ),
      );
    }
    // for non-logged in users don't allow coupon to be used if not covering the entire booking dates
    else if (noBookingDays !== _discountDays) {
      newCouponState = {
        ...initialCouponState,
        code: _code,
        couponError:
          "the coupon is expired or doesn't cover this booking period",
      };
    } else {
      // successful coupon use
      couponDiscount = ((_bookingPrice * _discountRate) / 100).toFixed(2);

      const availableAmount = reservedAmount - usedAmount;

      if (availableAmount < couponDiscount) {
        couponDiscount = availableAmount;
      }

      newCouponState = {
        code: _code,
        discountRate: _discountRate,
        couponDiscount,
        isCouponLoading: false,
        couponError: false,
        couponId,
      };
    }

    return { newCouponState };
  }
  if (apiError) {
    newCouponState = {
      ...initialCouponState,
      code: _code,
      couponError: apiError,
    };

    return { newCouponState };
  }
  return null;
};

const CouponCode = props => {
  const {
    dates,
    bookingPrice,
    setCouponState,
    couponState,
    currentUserId: userId,
    showAlertAndRedirectToProfile,
    inValidCouponDates,
    setCouponInvalidDates,
    disabled,
  } = props;

  const { discountRate, couponError, isCouponLoading, couponId } = couponState;

  let { code } = couponState;

  const [typing, setTyping] = useState(false);

  const handleCouponChange = e => {
    setTyping(true);
    code = e.target.value;
    setCouponState({ ...initialCouponState, code });
  };

  const handleBlur = async () => {
    setTyping(false);
    // validation
    if (
      !code ||
      typeof code !== 'string' ||
      code.length < 7 ||
      code.length > 14
    ) {
      setCouponState({
        ...initialCouponState,
        couponError: 'INVALID CODE',
        code,
      });
    } else {
      // no couponError
      setCouponState({
        ...initialCouponState,
        code,
        isCouponLoading: true,
        couponError: false,
      });

      // send request to check coupon code and set errors
      const { newCouponState } = await checkCouponCode({
        _code: code,
        _dates: dates,
        _bookingPrice: bookingPrice,
        userId,
        showAlertAndRedirectToProfile,
        inValidCouponDates,
        setCouponInvalidDates,
      });
      setCouponState(newCouponState);
    }
  };

  // updates state when code is valid on date / price change
  useEffect(() => {
    const getNewCouponState = async () => {
      const { newCouponState } = await checkCouponCode({
        _code: code,
        _dates: dates,
        _bookingPrice: bookingPrice,
      });
      return newCouponState;
    };
    if (code.length > 0 && !typing) {
      getNewCouponState().then(updatedState => {
        if (!updatedState.couponError.length) {
          setCouponState(updatedState);
        }
      });
    }
  }, [bookingPrice, code, dates, setCouponState, typing]);

  return (
    <>
      <Input
        name="couponCode"
        type="text"
        id="couponCode"
        size="large"
        onChange={handleCouponChange}
        onBlur={handleBlur}
        placeholder="   Type code ..."
        disabled={bookingPrice === 0 || disabled}
        value={code || ''}
      />

      {couponError ? (
        <T.PSBold style={{ color: colors.pink }}>{couponError}</T.PSBold>
      ) : (
        ''
      )}
      {isCouponLoading && (
        <T.PSBold style={{ color: colors.pink }}>
          ...checking your code
        </T.PSBold>
      )}
      {!couponError && isCouponLoading === false && couponId && (
        <T.PSBold
          style={{ color: colors.pink }}
        >{`${discountRate}% DISCOUNT RATE APPLIED`}</T.PSBold>
      )}
    </>
  );
};

export default CouponCode;
