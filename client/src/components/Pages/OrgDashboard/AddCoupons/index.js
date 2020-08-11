import React, { useEffect, useState, useReducer } from 'react';
import axios from 'axios';

import { Row, Col } from '../../../Common/Grid';
import Title from '../../../Common/Title';
import * as T from '../../../Common/Typography';
import { Select, DatePicker, Input } from '../../../Common/Inputs';

import { formatPrice } from '../../../../helpers';
import { typographies } from '../styleProperties';

import { API_ACCOUNT_URL } from '../../../../constants/apiRoutes';
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

const initialState = {
  email: '',
  name: '',
  message: '',
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
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [multiDateRange, setMultiDateRange] = useState([
    {
      startDate: '',
      endDate: '',
    },
  ]);

  const device = windowWidth < TABLET_WIDTH ? 'mobile' : 'desktop';
  const AmountTitle = typographies.addCouponAmount[device];

  const { email, name, message, errors } = state;

  useEffect(() => {
    let mounted = true;
    async function getAccount() {
      setBalanceLoading(true);
      const { data } = await axios.get(API_ACCOUNT_URL);

      if (mounted) {
        setBalance(data.currentBalance);
        setBalanceLoading(false);
      }
    }

    getAccount();
    return () => {
      mounted = false;
    };
  }, []);

  const onRangeChange = (date, type, index) => {
    const updatedDates = multiDateRange.map((dateObj, i) => {
      if (i === index) {
        return { ...dateObj, [type]: date };
      }
      return dateObj;
    });

    setMultiDateRange(updatedDates);
  };

  const handleInputChange = e => {
    const { name: _name, value } = e.target;
    console.log('name', _name);
    console.log('val', value);
    dispatch({ type: 'change', name: _name, value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('yh');
  };
  console.log('state', state);
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
      <form onSubmit={handleSubmit}>
        <Row mb={5}>
          <Col w={[4, 4, 5]}>
            <Select
              options={optionsPercentages}
              label="Discount %"
              placeholder="%"
              onChange={setDiscountPercentage}
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
      </form>
    </>
  );
};

export default AddCoupons;
