import React, { useEffect, useState, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

import { Row, Col } from '../../../Common/Grid';
import Title from '../../../Common/Title';
import * as T from '../../../Common/Typography';
import LinkCopy from '../../../Common/LinkCopy';
import Button from '../../../Common/ButtonNew';

import Form from './Form';

import { formatPrice, calculateCouponPriceByRange } from '../../../../helpers';
import { typographies } from '../styleProperties';
import {
  API_ACCOUNT_URL,
  API_COUPONS_URL,
} from '../../../../constants/apiRoutes';
import { TABLET_WIDTH } from '../../../../constants/screenWidths';
import { DASHBOARD_URL } from '../../../../constants/navRoutes';

import validationSchema from './validationSchema';

const { validate } = require('../../../../validation');

const initialState = {
  email: '',
  name: '',
  message: '',
  discountRate: null,
  multiDateRange: [
    {
      startDate: null,
      endDate: null,
    },
  ],
  couponPrice: null,
  errors: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'change':
      return {
        ...state,
        [action.name]: action.value,
      };

    case 'isError':
      return {
        ...state,
        errors: action.errors,
      };
    case 'resetState':
      return {
        ...initialState,
        errors: {},
      };
    default:
      throw new Error();
  }
};

const moment = extendMoment(Moment);

const AddCoupons = props => {
  const { windowWidth } = props;
  const [balance, setBalance] = useState(0);
  const [balanceLoading, setBalanceLoading] = useState(true);
  const [notEnoughFunds, setNotEnoughFunds] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const history = useHistory();

  const device = windowWidth < TABLET_WIDTH ? 'mobile' : 'desktop';
  const AmountTitle = typographies.addCouponAmount[device];

  const {
    email,
    name,
    message,
    multiDateRange,
    discountRate,
    couponPrice,
    code,
  } = state;

  const getAccount = async () => {
    setBalanceLoading(true);
    const { data } = await axios.get(API_ACCOUNT_URL);

    setBalance(data.currentBalance);

    setBalanceLoading(false);
  };

  // set funds
  useEffect(() => {
    getAccount();
  }, []);

  // calculate coupon price
  useEffect(() => {
    const { startDate, endDate } = multiDateRange[0];

    if (startDate && endDate && discountRate) {
      const price = calculateCouponPriceByRange(
        startDate,
        endDate,
        discountRate,
      );

      dispatch({
        type: 'change',
        name: 'couponPrice',
        value: price,
      });
    }
  }, [discountRate, multiDateRange]);

  // check if enough funds
  useEffect(() => {
    if (couponPrice > balance) {
      setNotEnoughFunds(true);
    } else {
      setNotEnoughFunds(false);
    }
  }, [couponPrice, balance]);

  const onRangeChange = (date, type, index) => {
    const updatedDates = multiDateRange.map((dateObj, i) => {
      if (i === index) {
        return { ...dateObj, [type]: date };
      }
      return dateObj;
    });

    dispatch({
      type: 'change',
      name: 'multiDateRange',
      value: updatedDates,
    });
  };

  const handleInputChange = e => {
    const { name: _name, value } = e.target;

    dispatch({ type: 'change', name: _name, value });
  };

  const handleSelectChange = value => {
    dispatch({
      type: 'change',
      name: 'discountRate',
      value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      setSubmitting(true);

      const { errors: validationErrors } = validate({
        schema: validationSchema,
        data: { discountRate, multiDateRange, name, email, message },
      });

      if (!validationErrors) {
        setError('');
        dispatch({ type: 'isError', errors: {} });

        const {
          data: { code: _code },
        } = await axios.post(API_COUPONS_URL, {
          name,
          email,
          message,
          discountRate,
          startDate: moment(multiDateRange[0].startDate).format('YYYY-MM-DD'),
          endDate: moment(multiDateRange[0].endDate).format('YYYY-MM-DD'),
        });
        setSubmitting(false);
        // refresh balance
        getAccount();
        // add code
        dispatch({ type: 'change', name: 'code', value: _code });
      } else {
        // set validation errors
        dispatch({ type: 'isError', errors: validationErrors });

        setSubmitting(false);
      }
    } catch (err) {
      // set server error
      setError(
        'Please make sure to fill in all required fields and to check if you have sufficient funds.',
      );
      setSubmitting(false);
    }
  };

  const resetState = () => dispatch({ type: 'resetState' });

  // SUCCESS PART
  if (code) {
    return (
      <>
        <Row>
          <Title withBg caps>
            <Col w={[4, 12, 12]}>success!</Col>
          </Title>
        </Row>
        <Row mb={5}>
          <Col w={[4, 10, 7]}>
            A discount code has been created and sent to {email}. You can also
            copy the link below if you would like to send it to them manually.{' '}
          </Col>
        </Row>
        <Row mb={5}>
          <Col w={[4, 10, 5]}>
            <LinkCopy strToCopy={code} />
          </Col>
        </Row>
        <Row mb={7}>
          <Col w={[4, 12, 12]}>
            <AmountTitle color="pink">
              £{balanceLoading ? '...' : formatPrice(balance)}
            </AmountTitle>
            <T.PSBold color="darkBlue">remaining balance</T.PSBold>
          </Col>
        </Row>
        <Row mb={5}>
          <Col w={[4, 6, 6]} mb={5}>
            <Button
              type="secondary"
              bgColor="pink"
              onClick={() => {
                resetState();
                getAccount();
              }}
            >
              CREATE ANOTHER CODE
            </Button>
          </Col>
        </Row>
        <Row mt="-2rem">
          <Col w={[4, 6, 6]} mb={5}>
            <Button
              type="primary"
              outline
              onClick={() => history.push(DASHBOARD_URL)}
            >
              GO TO DASHBOARD
            </Button>
          </Col>
        </Row>
      </>
    );
  }
  // FORM PART
  return (
    <>
      <Row>
        <Title withBg caps>
          <Col w={[4, 12, 12]}>add codes</Col>
        </Title>
      </Row>
      <Row>
        <Col w={[4, 12, 12]}>
          <AmountTitle color="pink">
            £{balanceLoading ? '...' : formatPrice(balance)}
          </AmountTitle>
          <T.PSBold color="darkBlue">available Balance</T.PSBold>
        </Col>
      </Row>
      <Form
        state={state}
        handleSubmit={handleSubmit}
        handleSelectChange={handleSelectChange}
        onRangeChange={onRangeChange}
        handleInputChange={handleInputChange}
        notEnoughFunds={notEnoughFunds}
        submitting={submitting}
        error={error}
        AmountTitle={AmountTitle}
      />
    </>
  );
};

export default AddCoupons;
