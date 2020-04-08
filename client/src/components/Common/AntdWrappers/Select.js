import React from 'react';
import { Select as AntdSelect } from 'antd';
import { SelectWrapper } from './style';

const Select = ({ children, ml, mr, mt, mb, size, ...props }) => (
  <SelectWrapper mt={mt} mb={mb} ml={ml} mr={mr}>
    <AntdSelect size={size || 'large'} {...props}>
      {children}
    </AntdSelect>
  </SelectWrapper>
);

export default Select;
