import React from 'react';
import moment from 'moment';
import { DatePicker as AntdDatePicker } from 'antd';

import Icon from '../Icon';
import * as S from './style';
import * as T from '../Typography';
import InfoSection from './InfoSection';

const format = 'DD/MM/YYYY';
const placeholder = 'DD/MM/YYYY';
const renderIcon = (
  <Icon icon="calendar" width="16px" height="16px" color="blue" />
);

const DatePicker = ({
  children,
  ml,
  mr,
  mt,
  mb,
  customFormat,
  customPlaceholder,
  style,
  width,
  error,
  onChange,
  type,
  multi,
  index,
  value,
  handleDelete,
  handleAdd,
  arrayLength,
  extraInfo,
  label,
  disablePast,
  disableFuture,
  ...props
}) => {
  const singleDatePickerDisabled = current => {
    if (disablePast) return current && current < moment();
    if (disableFuture) return current && current > moment();
    return false;
  };

  const disabledDate = (current, dateType, dates) => {
    if (dateType === 'start' && dates && dates.endDate) {
      return current && current > dates.endDate;
    }
    if (dateType === 'end' && dates && dates.startDate) {
      return current && current < dates.startDate;
    }
    return singleDatePickerDisabled(current);
  };

  if (type === 'dateRange') {
    return (
      <>
        {' '}
        {label && (
          <T.PBold as="label" color="primary" ml={2}>
            {label}
          </T.PBold>
        )}
        <S.DateRangeWrapper mt={mt} mb={mb} ml={ml} mr={mr} error={!!error}>
          <>
            <AntdDatePicker
              format={customFormat || format}
              placeholder={customPlaceholder || placeholder}
              type="date"
              suffixIcon={renderIcon}
              onChange={e => onChange(e, 'startDate', index)}
              value={value && value.startDate && moment(value.startDate)}
              disabledDate={current => disabledDate(current, 'start', value)}
              style={{ position: 'relative' }}
              {...props}
            />
            {error && error.startDate && (
              <S.Error style={{ position: 'absolute', left: 0, bottom: -20 }}>
                {error.startDate}
              </S.Error>
            )}
          </>
          <T.H7C color="pink" mr={4} ml={4}>
            until
          </T.H7C>
          <div
            style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
          >
            <AntdDatePicker
              format={customFormat || format}
              placeholder={customPlaceholder || placeholder}
              type="date"
              suffixIcon={renderIcon}
              onChange={e => onChange(e, 'endDate', index)}
              value={value && value.endDate && moment(value.endDate)}
              disabledDate={current => disabledDate(current, 'end', value)}
              {...props}
            >
              {children}
            </AntdDatePicker>

            {error && error.endDate && <S.Error>{error.endDate}</S.Error>}
          </div>
          {multi && (
            <S.CrossBtn show onClick={() => handleDelete(index)}>
              <Icon icon="cross" width="20px" height="20px" color="darkGray" />
              <S.CrossLabel>Remove</S.CrossLabel>
            </S.CrossBtn>
          )}
        </S.DateRangeWrapper>
        {error && typeof error === 'string' && <S.Error>{error}</S.Error>}
        {multi && (
          <S.AddBtn
            color="pink"
            onClick={handleAdd}
            show={arrayLength && index === arrayLength - 1}
          >
            + Add more
          </S.AddBtn>
        )}
        {error && typeof error === 'string' && <S.Error>{error}</S.Error>}
        {extraInfo && <InfoSection text={extraInfo} />}
      </>
    );
  }

  let _value = value;
  if (typeof _value === 'string') {
    _value = moment(_value);
  }

  return (
    <S.DatePickerWrapper mt={mt} mb={mb} ml={ml} mr={mr} error={!!error}>
      {label && (
        <T.PBold as="label" color="primary" ml={2}>
          {label}
        </T.PBold>
      )}
      <AntdDatePicker
        format={customFormat || format}
        placeholder={customPlaceholder || placeholder}
        type="date"
        suffixIcon={renderIcon}
        onChange={onChange}
        value={_value}
        disabledDate={singleDatePickerDisabled}
        {...props}
      >
        {children}
      </AntdDatePicker>
      {error && <S.Error>{error}</S.Error>}
      {extraInfo && <InfoSection text={extraInfo} />}
    </S.DatePickerWrapper>
  );
};

export default DatePicker;
