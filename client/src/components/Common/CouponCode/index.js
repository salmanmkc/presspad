import React, { useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Input, Skeleton, Alert } from 'antd';

import { API_COUPON_URL } from '../../../constants/apiRoutes';

import { createStartEndDate, getDiscountDays } from '../../../helpers';

const PaymentInfoRow = ({ data: { key, value } }) => (
  <Row
    style={{
      width: '210px',
      height: '4rem',
      borderBottom: '1px solid #d9d9d9',
    }}
    type="flex"
    align="middle"
  >
    <Col offset={1} span={14}>
      {key}:&nbsp;
    </Col>
    <Col span={9} style={{ color: 'rgba(0, 0, 0, 0.5)', fontWeight: 600 }}>
      {value}
    </Col>
  </Row>
);

// checks db with code
const makeRequest = async _code => {
  try {
    const {
      data: {
        data: [couponInfo],
      },
    } = await axios.get(`${API_COUPON_URL}?code=${_code}`);

    return { couponInfo };
  } catch (error) {
    let errorMsg = 'something went wrong';
    if (error.response && error.response.status === 404) {
      errorMsg = 'wrong code ..';
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
};

// calculates relevant details for coupon usage
const checkCouponCode = async (_code, _dates, _bookingPrice) => {
  const { couponInfo, apiError } = await makeRequest(_code);
  let couponDiscount;

  if (couponInfo) {
    const {
      startDate: couponStart,
      endDate: couponEnd,
      discountRate: _discountRate,
      usedDays,
      usedAmount,
      reservedAmount,
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
    couponDiscount = _bookingPrice * _discountRate;

    // get remaining amount
    const availableAmount = reservedAmount - usedAmount;

    if (availableAmount < couponDiscount) {
      couponDiscount = availableAmount;
    }

    const newCouponState = {
      code: _code,
      discountDays: _discountDays,
      discountRate: _discountRate,
      couponDiscount,
      isCouponLoading: false,
      couponError: false,
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
  const { dates, bookingPrice, setCouponState, couponState } = props;

  const {
    discountDays,
    discountRate,
    couponError,
    isCouponLoading,
    couponDiscount,
  } = couponState;

  let { code } = couponState;

  const handleCouponChange = async e => {
    code = e.target.value;

    // validation
    if (
      !code ||
      typeof code !== 'string' ||
      code.length < 7 ||
      code.length > 14
    ) {
      setCouponState({
        ...initialCouponState,
        couponError: 'invalid format',
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
      );
      if (newCouponState.couponError.length) setCouponState(newCouponState);
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

    getNewCouponState().then(updatedState => {
      if (!updatedState.couponError.length) {
        setCouponState(updatedState);
      }
    });
  }, [bookingPrice, code, dates, setCouponState]);

  return (
    <>
      <Input
        name="couponCode"
        type="text"
        id="couponCode"
        size="large"
        onChange={handleCouponChange}
        placeholder="   Type code ..."
        disabled={bookingPrice === 0}
      />

      {couponError ? <Alert type="error" message={couponError} /> : ''}
      {isCouponLoading ? <Skeleton paragraph={{ rows: 0 }} /> : ''}
      {!couponError && isCouponLoading === false && code && (
        <>
          <PaymentInfoRow
            data={{ key: 'Discount Days', value: discountDays }}
          />
          <PaymentInfoRow
            data={{ key: 'Discount', value: `${discountRate}%` }}
          />
          <PaymentInfoRow
            data={{
              key: 'Discount amount',
              value: `£${(couponDiscount / 100).toFixed(2)}`,
            }}
          />
        </>
      )}
    </>
  );
};

export default CouponCode;
