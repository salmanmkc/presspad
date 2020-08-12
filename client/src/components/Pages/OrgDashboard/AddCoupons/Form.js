import React from 'react';

import { Row, Col } from '../../../Common/Grid';
import { Select, DatePicker, Input } from '../../../Common/Inputs';
import Icon from '../../../Common/Icon';
import Button from '../../../Common/ButtonNew';
import * as T from '../../../Common/Typography';

import { formatPrice } from '../../../../helpers';
import { Warning, CancelLink, Error } from './style';

import { DASHBOARD_URL } from '../../../../constants/navRoutes';

const optionsPercentages = [
  { label: '10', value: 10 },
  { label: '25', value: 25 },
  { label: '50', value: 50 },
  { label: '100', value: 100 },
];

const Form = ({
  handleSubmit,
  handleSelectChange,
  onRangeChange,
  handleInputChange,
  notEnoughFunds,
  submitting,
  error,
  state,
  AmountTitle,
}) => {
  const {
    email,
    name,
    message,
    multiDateRange,
    discountRate,
    couponPrice,
    errors,
  } = state;

  return (
    <form onSubmit={handleSubmit}>
      <Row mt={5} mb={5}>
        <Col w={[4, 4, 5]}>
          <Select
            options={optionsPercentages}
            label="Discount %"
            placeholder="%"
            onChange={val => handleSelectChange(val)}
            value={discountRate}
            error={errors.discountRate}
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
              error={errors['multiDateRange[0]'] && 'required'}
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
          <AmountTitle color="pink">£{formatPrice(couponPrice)}</AmountTitle>
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
      {error && (
        <Row>
          <Col w={[4, 6, 5.4]}>
            <Error>{error}</Error>
          </Col>
        </Row>
      )}
      <Row mb={5}>
        <Col w={[4, 6, 5.4]} mb={5}>
          <Button type="secondary" bgColor="pink" loading={submitting}>
            CREATE DISCOUNT CODE
          </Button>
        </Col>
        <Col w={[4, 6, 5.4]}>
          <CancelLink to={DASHBOARD_URL} disabled={submitting}>
            Cancel
          </CancelLink>
        </Col>
      </Row>
    </form>
  );
};

export default Form;
