import React, { useState, useEffect } from 'react';
import Title from '../Title';
import { Switch, DatePicker } from '../Inputs';
import ButtonNew from '../ButtonNew';
import LinkButton from '../LinkButton';

import * as S from './style';

import { Row, Col } from '../Grid';

import { BOOKINGS_URL } from '../../../constants/navRoutes';

const BookingDates = ({ currentDates = [], autoAccept }) => {
  const [multiDateRange, setMultiDateRange] = useState([
    {
      startDate: '',
      endDate: '',
    },
  ]);
  const [acceptBookings, setAcceptBookings] = useState(false);

  const onRangeChange = (date, type, index) => {
    const updatedDates = multiDateRange.map((dateObj, i) => {
      if (i === index) {
        return { ...dateObj, [type]: date };
      }
      return dateObj;
    });

    setMultiDateRange(updatedDates);
  };

  const handleDelete = index => {
    const updatedDates = multiDateRange.filter((dateObj, i) => index !== i);
    setMultiDateRange(updatedDates);
  };

  const handleAdd = () => {
    setMultiDateRange([
      ...multiDateRange,
      {
        startDate: '',
        endDate: '',
      },
    ]);
  };

  //   FUNCTION HAS TO BE UPDATED HERE TO UPDATE THE DATES IN DATABASE
  const handleSubmit = () => {
    console.log('function to go here to update new dates on the back end');
  };

  useEffect(() => {
    setMultiDateRange(currentDates);
    setAcceptBookings(autoAccept);
  }, [autoAccept, currentDates]);

  return (
    <S.Wrapper>
      <Title section bgColor="primary" small mb={4}>
        Booking Details
      </Title>
      <Switch
        label="Automatically accept booking requests"
        checked={acceptBookings}
        onChange={() => setAcceptBookings(!acceptBookings)}
        mb={4}
      />
      {multiDateRange.length > 0 &&
        multiDateRange.map((date, index) => (
          <DatePicker
            onChange={onRangeChange}
            type="dateRange"
            multi
            index={index}
            handleDelete={handleDelete}
            handleAdd={handleAdd}
            arrayLength={multiDateRange.length}
            mb={3}
            value={date}
          />
        ))}
      <Row mt={5}>
        <Col w={[4, 12, 6]}>
          <ButtonNew
            small
            type="tertiary"
            bgColor="secondary"
            onClick={handleSubmit}
          >
            Save changes
          </ButtonNew>
        </Col>
        <Col
          w={[4, 12, 6]}
          style={{
            alignSelf: 'flex-end',
          }}
        >
          <S.LinkWrapper>
            <LinkButton
              url={BOOKINGS_URL}
              label="view all bookings"
              color="black"
            />
          </S.LinkWrapper>
        </Col>
      </Row>
    </S.Wrapper>
  );
};

export default BookingDates;
