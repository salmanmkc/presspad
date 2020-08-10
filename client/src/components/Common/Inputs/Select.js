import React from 'react';
import { Select as AntdSelect } from 'antd';
import { SelectWrapper, Error } from './style';
import Icon from '../Icon';
import * as T from '../Typography';
import InfoSection from './InfoSection';

const { Option } = AntdSelect;

const renderIcon = (
  <Icon icon="chevron" width="21px" height="21px" color="blue" />
);

const renderClearIcon = (
  <Icon icon="close" width="21px" height="21px" color="blue" />
);

const Select = ({
  ml,
  mr,
  mt,
  mb,
  options,
  placeholder,
  allowClear,
  label,
  helperText,
  multi,
  extraInfo,
  onChange,
  error,
  style,
  value,
  mode,
  height,
}) => (
  <SelectWrapper
    error={!!error}
    mt={mt}
    mb={mb}
    ml={ml}
    mr={mr}
    height={height}
  >
    {label && (
      <T.PBold as="label" color="primary" ml={2} style={{ display: 'block' }}>
        {label}
      </T.PBold>
    )}
    {helperText && (
      <T.PXS color="gray3" ml={2} mb={2} className="helper">
        {helperText}
      </T.PXS>
    )}
    <AntdSelect
      placeholder={placeholder || 'Select'}
      allowClear={allowClear}
      suffixIcon={renderIcon}
      removeIcon={renderClearIcon}
      clearIcon={renderClearIcon}
      mode={mode || (multi && 'multiple')}
      onChange={onChange}
      style={style}
      value={value || undefined}
    >
      {options.map(({ value: _value, label: _label }) => (
        <Option value={_value}>{_label}</Option>
      ))}
    </AntdSelect>
    {error && <Error>{error}</Error>}
    {extraInfo && <InfoSection text={extraInfo} />}
  </SelectWrapper>
);
Select.Option = AntdSelect.Option;

export default Select;
