import React from 'react';
import { Input as AntdInput } from 'antd';
import * as T from '../Typography';
import { InputWrapper, Error } from './style';
import InfoSection from './InfoSection';

const wordCounter = str => str.split(' ').filter(e => e !== '').length;

const { TextArea } = AntdInput;
const Input = ({
  label,
  mt,
  mb,
  mr,
  ml,
  textArea,
  error,
  placeholder,
  helperText,
  limit,
  onChange,
  onBlur,
  value,
  defaultValue,
  extraInfo,
  name,
  type,
  addonBefore,
}) => (
  <InputWrapper error={!!error} mt={mt} mb={mb} mr={mr} ml={ml}>
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
    {textArea ? (
      <TextArea
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder || 'Type here...'}
        rows={4}
        style={{ paddingTop: '10px' }}
        name={name}
        type={type}
      />
    ) : (
      <AntdInput
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder || 'Type here...'}
        name={name}
        type={type || 'text'}
        addonBefore={addonBefore}
      />
    )}
    {limit && (
      <T.PXS color={wordCounter(value) > limit ? 'red' : 'gray3'} ml={2}>
        Word count: {wordCounter(value)}
      </T.PXS>
    )}
    {error && <Error>{error}</Error>}
    {extraInfo && <InfoSection text={extraInfo} />}
  </InputWrapper>
);

export default Input;
