import React from 'react';
import { Switch as AntdSwitch } from 'antd';
import { SwitchWrapper } from './style';
import * as T from '../Typography';

const Switch = ({ children, label, id, ml, mr, mt, mb, ...props }) => (
  <SwitchWrapper mt={mt} mb={mb} ml={ml} mr={mr}>
    <AntdSwitch {...props} id={id} />
    <T.PL as="label" htmlFor={id}>
      {children || label}
    </T.PL>
  </SwitchWrapper>
);

export default Switch;
