import React, { useEffect, useState, useReducer } from 'react';
import axios from 'axios';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

import { Row, Col } from '../../../Common/Grid';
import Title from '../../../Common/Title';
import * as T from '../../../Common/Typography';
import { Select, DatePicker, Input } from '../../../Common/Inputs';
import Icon from '../../../Common/Icon';
import Button from '../../../Common/ButtonNew';

import { formatPrice, calculatePrice } from '../../../../helpers';
import { typographies } from '../styleProperties';
import { Warning, CancelLink } from './style';

import { API_ACCOUNT_URL } from '../../../../constants/apiRoutes';
import { DASHBOARD_URL } from '../../../../constants/navRoutes';
import { TABLET_WIDTH } from '../../../../constants/screenWidths';

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
    default:
      throw new Error();
  }
};

const moment = extendMoment(Moment);

const initialState = {
  email: '',
  name: '',
  message: '',
  discountPercentage: 0,
  multiDateRange: [
    {
      startDate: null,
      endDate: null,
    },
  ],
  couponPrice: 0,
  errors: {},
};

const optionsPercentages = [
  { label: '10', value: 10 },
  { label: '25', value: 25 },
  { label: '50', value: 50 },
  { label: '100', value: 100 },
];

const AddCoupons = props => {
  const { windowWidth } = props;
  const [balance, setBalance] = useState(0);
  const [balanceLoading, setBalanceLoading] = useState(true);
  const [state, dispatch] = useReducer(reducer, initialState);

  const device = windowWidth < TABLET_WIDTH ? 'mobile' : 'desktop';
  const AmountTitle = typographies.addCouponAmount[device];

  const {
    email,
    name,
    message,
    multiDateRange,
    discountPercentage,
    couponPrice,
    errors,
  } = state;

  useEffect(() => {
    let mounted = true;
    async function getAccount() {
      setBalanceLoading(true);
      const { data } = await axios.get(API_ACCOUNT_URL);

      if (mounted) {
        setBalance(formatPrice(data.currentBalance));
        setBalanceLoading(false);
      }
    }

    getAccount();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const { startDate, endDate } = multiDateRange[0];

    if (startDate && endDate && discountPercentage > 0) {
      const range = moment.range(startDate, endDate);
      const price = formatPrice(
        (calculatePrice(range) * Number(discountPercentage)) / 100,
      );

      dispatch({
        type: 'change',
        name: 'couponPrice',
        value: price,
      });
    }
  }, [discountPercentage, multiDateRange]);

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
      name: 'discountPercentage',
      value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('yh');
  };

  const notEnoughFunds = couponPrice > balance;

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
            £{balanceLoading ? '...' : balance}
          </AmountTitle>
          <T.PSBold color="darkBlue">available Balance</T.PSBold>
        </Col>
      </Row>
      <form onSubmit={handleSubmit}>
        <Row mt={5} mb={5}>
          <Col w={[4, 4, 5]}>
            <Select
              options={optionsPercentages}
              label="Discount %"
              placeholder="%"
              onChange={val => handleSelectChange(val)}
              value={discountPercentage}
            />
          </Col>
        </Row>
        <Row mb={5}>
          <Col w={[4, 12, 8]}>
            {multiDateRange.map((date, index) => (
              <DatePicker
                label="Internship dates"
                onChange={onRangeChange}
                type="dateRange"
                index={index}
                mb={1}
                value={multiDateRange[index]}
              />
            ))}
          </Col>
        </Row>
        <Row mb={5}>
          <Col w={[4, 12, 5]}>
            <Input
              onChange={handleInputChange}
              name="email"
              label="Intern’s email address"
              placeholder="Enter email address"
              type="email"
              value={email}
              error={errors.email}
            />
          </Col>
        </Row>
        <Row mb={5}>
          <Col w={[4, 12, 5]}>
            <Input
              onChange={handleInputChange}
              name="name"
              label="Intern’s full name"
              placeholder="Enter name"
              type="text"
              value={name}
              error={errors.name}
            />
          </Col>
        </Row>
        <Row mb={5}>
          <Col w={[4, 3, 3]}>
            <AmountTitle color="pink">£{couponPrice}</AmountTitle>
            <T.PSBold color="darkBlue">potential cost of internship</T.PSBold>
          </Col>
          {notEnoughFunds && (
            <Warning w={[4, 3, 3]}>
              <Icon
                color="pink"
                icon="warning"
                width="40"
                height="40"
                margin="0 5px 0 0"
              />
              <T.H8C caps color="blue" style={{ display: 'inline-flex' }}>
                Not enough money in the fund
              </T.H8C>
            </Warning>
          )}
        </Row>
        <Row mb={5}>
          <Col w={[4, 12, 8]}>
            <Input
              onChange={handleInputChange}
              name="message"
              label="Send an optional message to intern"
              placeholder="Type here..."
              textArea
              value={message}
              error={errors.message}
            />
          </Col>
        </Row>
        <Row mb={5}>
          <Col w={[4, 6, 5.4]} mb={5}>
            <Button type="secondary" bgColor="pink" disabled={notEnoughFunds}>
              CREATE DISCOUNT CODE
            </Button>
          </Col>
          <Col w={[4, 6, 5.4]}>
            <CancelLink
              to={DASHBOARD_URL}
              // disabled={paymentLoading}
            >
              Cancel
            </CancelLink>
          </Col>
        </Row>
      </form>
    </>
  );
};

export default AddCoupons;
