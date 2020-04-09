import React from 'react';
import { Switch as AntdSwitch } from 'antd';

import { withWindowWidth } from '../../../HOCs';
import { MOBILE_M_WIDTH } from '../../../constants/screenWidths';
import { SwitchWrapper } from './style';
import * as T from '../Typography';

const Switch = ({
  children,
  label,
  id,
  ml,
  mr,
  mt,
  mb,
  windowWidth,
  ...props
}) => {
  const Label = windowWidth > MOBILE_M_WIDTH ? T.PL : T.PXS;

  return (
    <SwitchWrapper mt={mt} mb={mb} ml={ml} mr={mr}>
      {console.log(windowWidth > MOBILE_M_WIDTH)}
      <AntdSwitch
        {...props}
        id={id}
        size={windowWidth > MOBILE_M_WIDTH ? 'default' : 'small'}
      />
      <Label as="label" htmlFor={id}>
        {children || label}
      </Label>
    </SwitchWrapper>
  );
};

export default withWindowWidth(Switch);
