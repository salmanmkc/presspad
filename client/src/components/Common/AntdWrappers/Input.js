import React from 'react';
import { Input as AntdInput } from 'antd';
import * as T from '../Typography';
import { InputWrapper, Error } from './style';

const { TextArea } = AntdInput;
const Input = ({ label, mt, mb, mr, ml, textArea, error, ...props }) => (
  <InputWrapper error={!!error} mt={mt} mb={mb} mr={mr} ml={ml}>
    <T.PBold as="label">
      {label}
      {textArea ? (
        <TextArea
          {...props}
          size="large"
          style={{ marginTop: '5px', height: '100%' }}
        />
      ) : (
        <AntdInput {...props} size="large" style={{ marginTop: '5px' }} />
      )}
      {error && <Error>{error}</Error>}
    </T.PBold>
  </InputWrapper>
);

export default Input;
