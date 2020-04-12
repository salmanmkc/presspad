import React from 'react';
import { DatePicker as AntdDatePicker } from 'antd';
import { DatePickerWrapper } from './style';

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
  ...props
}) => (
  <DatePickerWrapper mt={mt} mb={mb} ml={ml} mr={mr}>
    <AntdDatePicker
      size={size || 'large'}
      format={format || 'YYYY-MM-DD'}
      type="date"
      style={{ ...style, width: '100%' }}
      {...props}
    >
      {children}
    </AntdDatePicker>
  </DatePickerWrapper>
);

export default DatePicker;
