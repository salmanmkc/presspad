import React from 'react';
import { Checkbox as AntdCheckbox } from 'antd';
import { CheckboxWrapper, Error } from './style';

const Checkbox = ({
  ml,
  mr,
  mt,
  mb,
  size,
  label,
  onChange,
  checked,
  error,
}) => (
  <>
    <CheckboxWrapper
      error={!!error}
      mt={mt}
      mb={mb}
      ml={ml}
      mr={mr}
      size={size}
    >
      <AntdCheckbox
        style={{
          display: 'flex',
          fontSize: size === 'small' ? '0.875rem' : '1rem',
        }}
        onChange={onChange}
        checked={checked}
      >
        {label}
      </AntdCheckbox>
    </CheckboxWrapper>
    {error && <Error checkbox>{error}</Error>}
  </>
);

export default Checkbox;
