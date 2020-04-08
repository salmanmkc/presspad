import React from 'react';
import { Select as AntdSelect } from 'antd';
import { SelectWrapper } from './style';

const Select = ({ children, ...props }) => (
  <SelectWrapper>
    <AntdSelect {...props}>{children}</AntdSelect>
  </SelectWrapper>
);

export default Select;
