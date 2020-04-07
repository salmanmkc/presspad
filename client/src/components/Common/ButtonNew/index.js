import React from 'react';
import styled, { css, withTheme } from 'styled-components';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const sharedStyles = css`
  position: relative;
  text-align: center;
  text-decoration: none;
  outline: none;
  border: 2px solid ${({ theme }) => theme.colors.blue}; /* default */
  padding: ${({ theme, small }) =>
    small ? theme.spacings[2] : theme.spacings[3]};
  font-size: ${({ small }) => (small ? '14px' : '18px')};
  line-height: ${({ small }) => (small ? '14px' : '26px')};
  font-weight: bold;
  text-transform: uppercase;
  /* TODO change the 150 to get it from the theme */
  min-width: ${({ theme, small }) => (small ? '150px' : theme.spacings[12])};
  border-radius: 10px;
  text-transform: uppercase;

  margin: ${props => props.margin || 0};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${props => props.disabled && !props.loading && 0.3};

  &:hover::after {
    content: '';
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    background: rgba(255, 255, 255, 0.08);
    box-shadow: none;
    border-radius: 10px;
  }
  &:active::after {
    content: '';
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    box-shadow: none;
    border-radius: 10px;
  }
`;

export const primaryStyles = css`
  background-color: ${({ theme, small, outline }) => {
    if (small) return theme.colors.black;
    if (outline) return theme.colors.white;
    return theme.colors.blue;
  }};
  color: ${({ theme, outline }) =>
    outline ? theme.colors.blue : theme.colors.white};

  :hover {
    color: ${({ theme, small }) =>
      small ? theme.colors.black : theme.colors.white};
    background-color: ${({ theme, outline, small }) => {
      if (small) return theme.colors.white;
      if (outline) return theme.colors.blue;
      return theme.colors.lightBlue;
    }};
    border-color: ${({ theme, outline, small }) => {
      if (small) return theme.colors.black;
      if (outline) return theme.colors.blue;
      return theme.colors.lightBlue;
    }};
  }
`;

export const secondaryStyles = css`
  background-color: ${({ theme, outline }) =>
    outline ? theme.colors.white : theme.colors.pink};
  color: ${({ theme, outline }) =>
    outline ? theme.colors.darkGray : theme.colors.white};
  border-color: ${({ theme }) => theme.colors.pink};
  :hover {
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.pink};
  }
`;

export const tertiaryStyles = css`
  background-color: ${({ theme, outline }) =>
    outline ? theme.colors.white : theme.colors.lightBlue};
  color: ${({ theme, outline }) =>
    outline ? theme.colors.darkGray : theme.colors.white};
  border-color: ${({ theme }) => theme.colors.lightBlue};
  :hover {
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.lightBlue};
  }
`;

const StyledButton = styled.button`
  ${sharedStyles};
  ${props => props.type === 'primary' && primaryStyles}
  ${props => props.type === 'secondary' && secondaryStyles}
  ${props => props.type === 'tertiary' && tertiaryStyles}
  
`;

export const ButtonSpinner = withTheme(({ outline, theme }) => {
  // antd spinner for the submit button
  const antIcon = (
    <LoadingOutlined
      type="loading"
      style={{
        fontSize: 24,
        color: outline ? theme.colors.darkGray : theme.colors.white,
      }}
      spin
    />
  );
  return <Spin indicator={antIcon} style={{ marginRight: '.5rem' }} />;
});

const Button = ({
  label,
  loading,
  disabled,
  spinnerColor,
  children,
  ...props
}) => (
  <StyledButton aria-label={label} {...props} disabled={disabled || loading}>
    {loading && <ButtonSpinner outline={props.outline} />}
    {label || children}
  </StyledButton>
);

export default Button;
