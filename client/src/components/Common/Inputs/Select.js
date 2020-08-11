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
}) => (
  <SelectWrapper error={!!error} mt={mt} mb={mb} ml={ml} mr={mr}>
    {label && (
      <T.PBold as="label" color="primary" ml={2}>
        {label}
      </T.PBold>
    )}
    {helperText && (
      <T.PXS color="gray3" ml={2} mb={2}>
        {helperText}
      </T.PXS>
    )}
    <AntdSelect
      placeholder={placeholder || 'Select'}
      allowClear={allowClear}
      suffixIcon={renderIcon}
      removeIcon={renderClearIcon}
      clearIcon={renderClearIcon}
      mode={multi && 'multiple'}
      onChange={onChange}
      style={style}
    >
      {options.map(({ value, label: _label }) => (
        <Option key={value} value={value}>
          {_label}
        </Option>
      ))}
    </AntdSelect>
    {error && <Error>{error}</Error>}
    {extraInfo && <InfoSection text={extraInfo} />}
  </SelectWrapper>
);
Select.Option = AntdSelect.Option;

export default Select;
