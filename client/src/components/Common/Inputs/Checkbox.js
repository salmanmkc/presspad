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
  isMulti,
  items,
  checkedValues,
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
      {!isMulti && (
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
      )}
      {isMulti && (
        <AntdCheckbox.Group onChange={onChange} defaultValue={checkedValues}>
          {items.map(e => (
            <AntdCheckbox
              key={e}
              value={e}
              checked={checkedValues.includes(e)}
              style={{
                display: 'flex',
                marginLeft: 0,
                fontSize: 16,
                marginBottom: 5,
              }}
            >
              {e}
            </AntdCheckbox>
          ))}
        </AntdCheckbox.Group>
      )}
    </CheckboxWrapper>
    {error && <Error checkbox>{error}</Error>}
  </>
);

export default Checkbox;
