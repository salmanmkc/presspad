import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Input, Skeleton, Alert } from 'antd';

import { API_COUPON_URL } from '../../../constants/apiRoutes';

import {
  calculatePrice,
  createStartEndDate,
  getDiscountDays,
} from '../../../helpers';

import { CouponInputWrapper } from './CouponCode.style';

const PaymentInfoRow = ({ data: { key, value } }) => (
  <Row
    style={{ height: '2.3rem', borderBottom: '1px solid #d9d9d9' }}
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

const CouponCode = props => {
  const { dates } = props;
  const initialCouponInfo = {
    isCouponLoading: false,
    couponDiscount: 0,
    couponCode: '',
    error: '',
  };

  const [couponState, setCouponState] = useState(initialCouponInfo);

  const handleCouponChange = async e => {
    const code = e.target.value;

    // check code format
    if (
      !code ||
      typeof code !== 'string' ||
      code.length < 7 ||
      code.length > 14
    ) {
      setCouponState({
        ...initialCouponInfo,
        error: 'invalid format',
        couponCode: code,
      });
    } else {
      // no error
      setCouponState({
        couponCode: code,
        isCouponLoading: true,
        error: false,
      });

      // send request to check coupon code
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

        // get user booking request details
        const bookingdates =
          dates.length > 1 && createStartEndDate(dates[0], dates[1]);
        const startDate = bookingdates[0];
        const endDate = bookingdates[1];

        // calculate discount days
        const { discountDays } = getDiscountDays({
          bookingStart: startDate,
          bookingEnd: endDate,
          couponStart,
          couponEnd,
          usedDays,
        });

        // calculate discounted percentage
        let couponDiscount =
          (calculatePrice(discountDays) * discountRate) / 100;

        // get remaining amount
        const availableAmount = reservedAmount - usedAmount;

        if (availableAmount < couponDiscount) {
          couponDiscount = availableAmount;
        }

        const newCouponState = {
          couponCode: code,
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
        setCouponState(newCouponState);
      } catch (error) {
        let errorMsg = 'something went wrong';
        if (error.response && error.response.status === 404) {
          errorMsg = 'wrong code ..';
        }

        setCouponState({
          couponCode: code,
          isCouponLoading: false,
          error: errorMsg,
          couponDiscount: 0,
        });
      }
    }
  };

  const {
    error,
    isCouponLoading,
    couponCode,
    discountDays,
    discountRate,
    couponDiscount,
  } = couponState;

  return (
    <>
      <Input
        name="couponCode"
        type="text"
        id="couponCode"
        value={couponCode}
        size="large"
        onChange={e => handleCouponChange(e)}
        placeholder="   Type code ..."
        // addonBefore={<CouponInputWrapper htmlFor="couponCode">Coupon code:</InputLabel>}
      />

      {error ? <Alert type="error" message={error} /> : ''}
      {isCouponLoading ? <Skeleton paragraph={{ rows: 0 }} /> : ''}
      {!error && isCouponLoading === false && couponCode && (
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
