import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Input } from 'antd';

import {
  API_COUPON_URL,
  API_COUPON_SOFT_URL,
} from '../../../constants/apiRoutes';

import { createStartEndDate, getDiscountDays } from '../../../helpers';

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
const checkCouponCode = async (_code, _dates, _bookingPrice, userId) => {
  const { couponInfo, apiError } = await makeRequest(_code, userId);
  let couponDiscount;

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

    // get user booking request details
    const bookingdates =
      _dates.length > 1 && createStartEndDate(_dates[0], _dates[1]);
    const startDate = bookingdates[0];
    const endDate = bookingdates[1];

    // calculate discount days
    const { discountDays: _discountDays } = getDiscountDays({
      bookingStart: startDate,
      bookingEnd: endDate,
      couponStart,
      couponEnd,
      usedDays,
    });

    // calculate discount

    couponDiscount = ((_bookingPrice * _discountRate) / 100).toFixed(2);

    // get remaining amount
    const availableAmount = reservedAmount - usedAmount;

    if (availableAmount < couponDiscount) {
      couponDiscount = availableAmount;
    }

    const newCouponState = {
      code: _code,
      discountRate: _discountRate,
      couponDiscount,
      isCouponLoading: false,
      couponError: false,
      couponId,
    };

    if (_discountDays === 0) {
      newCouponState.couponError =
        "the coupon is expired or doesn't cover this booking period";
    }

    return { newCouponState };
  }
  if (apiError) {
    const newCouponState = {
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
    bursary,
    currentUserId: userId,
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
      const { newCouponState } = await checkCouponCode(
        code,
        dates,
        bookingPrice,
        userId,
      );
      setCouponState(newCouponState);
    }
  };

  // updates state when code is valid on date / price change
  useEffect(() => {
    const getNewCouponState = async () => {
      const { newCouponState } = await checkCouponCode(
        code,
        dates,
        bookingPrice,
      );
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
        disabled={bookingPrice === 0 || bursary}
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
