import React from 'react';
import { DatePicker as AntdDatePicker } from 'antd';
import { DatePickerWrapper } from './style';

const DatePicker = ({ children, ...props }) => (
  <DatePickerWrapper>
    <AntdDatePicker {...props}>{children}</AntdDatePicker>
  </DatePickerWrapper>
);

export default DatePicker;
