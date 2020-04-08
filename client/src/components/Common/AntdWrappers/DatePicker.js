import React from 'react';
import { DatePicker as AntdDatePicker } from 'antd';
import { DatePickerWrapper } from './style';

const DatePicker = ({ children, ml, mr, mt, mb, size, format, ...props }) => (
  <DatePickerWrapper mt={mt} mb={mb} ml={ml} mr={mr}>
    <AntdDatePicker
      size={size || 'large'}
      format={format || 'YYYY-MM-DD'}
      {...props}
    >
      {children}
    </AntdDatePicker>
  </DatePickerWrapper>
);

export default DatePicker;
