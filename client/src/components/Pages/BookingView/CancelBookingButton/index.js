import React from 'react';
import styled from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';

import { H7C } from '../../../Common/Typography';
import { ButtonSpinner } from '../../../Common/ButtonNew';

const StyledButton = styled.button`
  text-decoration: none;
  outline: none;
  background: none;
  border: none;
  display: flex;
  cursor: pointer;
  align-items: center;
  > span {
    margin-right: ${({ theme }) => theme.spacings[1]};
    color: ${({ theme }) => theme.colors.lightGray};
    font-size: 9px;
    line-height: 9px;
    height: 9px;
    > * {
      line-height: unset;
      font-size: unset;
      margin-right: 0 !important;
    }
  }
  :hover > * {
    color: ${({ theme }) => theme.colors.gray};
  }
  :active > * {
    color: ${({ theme }) => theme.colors.gray};
    transform: translate(1px, 1px);
  }
`;

const CancelBookingButton = ({
  label,
  loading,
  disabled,
  spinnerColor,
  children,
  ...props
}) => (
  <StyledButton aria-label={label} {...props} disabled={disabled || loading}>
    <span>
      {loading ? <ButtonSpinner outline size={9} /> : <CloseOutlined />}
    </span>
    <H7C color="lightGray">{label || children}</H7C>
  </StyledButton>
);

export default CancelBookingButton;
