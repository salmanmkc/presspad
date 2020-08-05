import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { message } from 'antd';
import Title from '../Title';
import { Switch, DatePicker } from '../Inputs';
import ButtonNew from '../ButtonNew';
import LinkButton from '../LinkButton';
import validateRequest from './validateAvailabiltySchema';
import { PXSBold } from '../Typography';

import * as S from './style';

import { Row, Col } from '../Grid';

import { BOOKINGS_URL } from '../../../constants/navRoutes';
import { API_HOST_UPDATE_AVAILABILITY } from '../../../constants/apiRoutes';

const BookingDates = ({ currentDates = [], autoAccept }) => {
  const [multiDateRange, setMultiDateRange] = useState([
    {
      startDate: '',
      endDate: '',
    },
  ]);
  const [acceptBookings, setAcceptBookings] = useState(false);
  const [errors, setErrors] = useState({});
  const [updateLoading, setUpdateLoading] = useState(false);

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

  const handleSubmit = async () => {
    try {
      const requestData = {
        availableDates: multiDateRange,
        acceptAutomatically: acceptBookings,
      };
      const valid = await validateRequest().validate(requestData, {
        abortEarly: false,
      });

      if (valid) {
        setErrors({});
        setUpdateLoading(true);
        await axios.patch(API_HOST_UPDATE_AVAILABILITY, requestData);
        setUpdateLoading(false);
        message.success('updated!');
      } else {
        setUpdateLoading(false);
        return null;
      }
    } catch (err) {
      if (err.name === 'ValidationError') {
        const _errors = {};
        err.inner.forEach(element => {
          _errors[element.path.split('.')[0]] = element.message;
        });
        setErrors({ ...errors, ..._errors });
        setUpdateLoading(false);
      }
    }
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
            loading={updateLoading}
            disabled={updateLoading}
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
        {errors &&
          Object.values(errors).length > 0 &&
          Object.values(errors).map(err => (
            <PXSBold color="pink">{err}</PXSBold>
          ))}
      </Row>
    </S.Wrapper>
  );
};

export default BookingDates;
