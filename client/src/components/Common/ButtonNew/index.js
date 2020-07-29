import React from 'react';
import styled, { css, withTheme } from 'styled-components';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Graphic from '../../../assets/graphic.svg';
import Arrow2 from '../../../assets/Arrow2.svg';
import CloseOutline from '../../../assets/closeOutline.svg';

const sharedStyles = css`
  position: relative;
  text-align: center;
  text-decoration: none;
  outline: none;
  height: ${({ small }) => (small ? 'auto' : '50px')};
  border: 2px solid ${({ theme }) => theme.colors.blue}; /* default */
  padding: ${({ theme, small }) => (small ? theme.spacings[2] : '0px')};
  font-size: ${({ small }) => (small ? '14px' : '18px')};
  line-height: ${({ small }) => (small ? '14px' : '26px')};
  font-weight: bold;
  text-transform: uppercase;
  /* TODO change the 150 to get it from the theme */
  min-width: ${({ theme, small }) => (small ? '150px' : theme.spacings[12])};
  border-radius: 10px;
  text-transform: uppercase;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${props => props.disabled && !props.loading && 0.3};

  margin: ${props => props.margin || 0};
  margin-top: ${({ mt, theme }) => (mt ? theme.spacings[mt] : 0)};
  margin-bottom: ${({ mb, theme }) => (mb ? theme.spacings[mb] : 0)};
  margin-left: ${({ ml, theme }) => (ml ? theme.spacings[ml] : 0)};
  margin-right: ${({ mr, theme }) => (mr ? theme.spacings[mr] : 0)};
  transition: 0.1s;

  :hover {
    opacity: 0.8;
  }
  :active {
    transform: translateY(1px);
  }
`;

export const primaryStyles = css`
  background-color: ${({ theme, small, outline, bgColor }) => {
    if (small) return theme.colors[bgColor] || theme.colors.black;
    if (outline) return theme.colors[bgColor] || theme.colors.white;
    return theme.colors[bgColor] || theme.colors.blue;
  }};
  color: ${({ theme, outline, textColor }) =>
    outline
      ? theme.colors[textColor] || theme.colors.blue
      : theme.colors[textColor] || theme.colors.white};
`;

export const secondaryStyles = css`
  background-color: ${({ theme, outline, bgColor }) =>
    outline
      ? theme.colors[bgColor] || theme.colors.white
      : theme.colors[bgColor] || theme.colors.pink};
  color: ${({ theme, outline, textColor }) =>
    outline
      ? theme.colors[textColor] || theme.colors.pink
      : theme.colors[textColor] || theme.colors.white};
  border-color: ${({ theme, bgColor }) =>
    theme.colors[bgColor] || theme.colors.pink};
`;

export const tertiaryStyles = css`
  background-color: ${({ theme, outline, bgColor }) =>
    outline
      ? theme.colors[bgColor] || theme.colors.white
      : theme.colors[bgColor] || theme.colors.lightBlue};
  color: ${({ theme, outline, textColor }) =>
    outline
      ? theme.colors[textColor] || theme.colors.darkGray
      : theme.colors[textColor] || theme.colors.white};
  border-color: ${({ theme, bgColor }) =>
    theme.colors[bgColor] || theme.colors.lightBlue};
`;

export const linkStyles = css`
  background-color: transparent;
  color: ${({ theme, textColor }) =>
    theme.colors[textColor] || theme.colors.black};
  border: none;
  font-size: 14px;
`;

export const deleteStyles = css`
  background-color: transparent;
  color: ${({ theme, textColor }) =>
    theme.colors[textColor] || theme.colors.gray3};
  border: none;
  font-size: 14px;
`;

const StyledButton = styled.button`
  ${sharedStyles};
  ${props => props.type === 'primary' && primaryStyles}
  ${props => props.type === 'secondary' && secondaryStyles}
  ${props => props.type === 'tertiary' && tertiaryStyles}
  ${props => props.type === 'link' && linkStyles}
  ${props => props.type === 'delete' && deleteStyles}

`;

export const ButtonSpinner = withTheme(({ outline, size, theme }) => {
  // antd spinner for the submit button
  const antIcon = (
    <LoadingOutlined
      type="loading"
      style={{
        fontSize: size || 24,
        color: outline ? theme.colors.darkGray : theme.colors.white,
      }}
      spin
    />
  );
  return <Spin indicator={antIcon} style={{ marginRight: '.5rem' }} />;
});

export const GraphicIcon = withTheme(() => {
  // antd spinner for the submit button
  const antIcon = (
    <img src={Graphic} alt="graphic" style={{ width: 50, height: 40 }} />
  );
  return <Spin indicator={antIcon} style={{ marginRight: '.5rem' }} />;
});

export const ArrowIcon = withTheme(() => {
  // antd spinner for the submit button
  const antIcon = (
    <img src={Arrow2} alt="Arrow" style={{ width: 20, height: 20 }} />
  );
  return <Spin indicator={antIcon} style={{ marginLeft: '.5rem' }} />;
});

export const CloseOutlineIcon = withTheme(() => {
  // antd spinner for the submit button
  const antIcon = (
    <img
      src={CloseOutline}
      alt="CloseOutlineIcon"
      style={{ width: 25, height: 25 }}
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
  withGraphic,
  type,
  ...props
}) => (
  <StyledButton
    aria-label={label}
    type={type}
    disabled={disabled || loading}
    {...props}
  >
    {loading && <ButtonSpinner outline={props.outline} />}
    {withGraphic && <GraphicIcon />}
    {type === 'delete' && <CloseOutlineIcon />}
    {label || children}
    {type === 'link' && <ArrowIcon />}
  </StyledButton>
);

export default Button;
