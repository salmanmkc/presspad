import React from 'react';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from 'react-stripe-elements';
import styled, { useTheme } from 'styled-components';

import Icon from '../Icon';
import * as T from '../Typography';
import { InputWrapper, Error } from './style';

const Input = styled.div`
  width: 100%;
  height: 50px;
  border-radius: 10px;
  border: ${({ theme, error }) =>
    error ? theme.borders.error : theme.borders.inputBox};
  padding: 17px 11px;
  position: relative;

  :active,
  :focus {
    border-color: ${({ theme }) => theme.colors.blue};
  }
`;

function StripeInputElement({ type, ...props }) {
  switch (type) {
    case 'cardNumber':
      return <CardNumberElement {...props} />;
    case 'cardExpiry':
      return <CardExpiryElement {...props} />;
    case 'cardCvc':
      return <CardCvcElement {...props} />;
    default:
      throw new Error('wrong type');
  }
}

export default function StripeInput({
  label,
  mt,
  mb,
  mr,
  ml,
  error,
  validate,
  iconColor,
  ...props
}) {
  const theme = useTheme();

  const style = {
    base: {
      display: 'block',
      color: theme.colors.gray3,
      fontSize: '1rem',
      fontFamily: 'Glacial Indifference',
    },
  };
  const { complete, empty, error: _error /* brand */ } = validate;

  const err = _error || error;

  return (
    <InputWrapper
      error={!complete && !empty && err}
      mt={mt}
      mb={mb}
      mr={mr}
      ml={ml}
    >
      {label && (
        <T.PBold as="label" color="primary" ml={2}>
          {label}
        </T.PBold>
      )}
      <Input error={(!complete && !empty) || err}>
        <StripeInputElement style={style} {...props} />
        {props.type === 'cardNumber' && (
          <Icon
            icon="unKnownCard"
            style={{
              position: 'absolute',
              right: '10px',
              transform: 'translateY(-50%)',
              top: '50%',
            }}
            height={15}
            width={20}
            color={iconColor}
          />
        )}
      </Input>
      {err && <Error>{err.message || err.complete}</Error>}
    </InputWrapper>
  );
}
