import React from 'react';
import { DatePicker as AntdDatePicker } from 'antd';
import { DatePickerWrapper, Error } from './style';

const DatePicker = ({
  children,
  ml,
  mr,
  mt,
  mb,
  size,
  format,
  style,
  width,
  error,
  ...props
}) => (
  <DatePickerWrapper mt={mt} mb={mb} ml={ml} mr={mr} error={!!error}>
    <AntdDatePicker
      size={size || 'large'}
      format={format || 'YYYY-MM-DD'}
      type="date"
      style={{ ...style, width: '100%' }}
      {...props}
    >
      {children}
    </AntdDatePicker>
    {error && <Error>{error}</Error>}
  </DatePickerWrapper>
);

export default DatePicker;
