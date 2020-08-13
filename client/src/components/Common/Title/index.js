import React from 'react';
import styled, { css, withTheme } from 'styled-components';
import * as T from '../Typography';

import WithBackground from './WithBackground';

const sharedStyles = css`
  padding-left: 30px;
  margin-top: ${({ mt, theme }) => (mt ? theme.spacings[mt] : 0)};
  margin-bottom: ${({ mb, theme }) => (mb ? theme.spacings[mb] : 0)};
  margin-left: ${({ ml, theme }) => (ml ? theme.spacings[ml] : 0)};
  margin-right: ${({ mr, theme }) => (mr ? theme.spacings[mr] : 0)};
  @media ${({ theme }) => theme.breakpoints.mobileXL} {
    padding-left: 120px;
  }
`;

const AlternateTitle = styled.div`
  width: 100%;
  position: relative;

  & .top {
    ${sharedStyles};
    background-color: ${({ theme, bgColor1 }) =>
      bgColor1 || theme.colors.white};
    width: 100%;
    height: 50%;
    color: ${({ theme, bgColor2 }) => bgColor2 || theme.colors.blue};
    padding-top: 20px;
  }

  & .bottom {
    ${sharedStyles};
    background-color: ${({ theme, bgColor2 }) => bgColor2 || theme.colors.blue};
    width: 100%;
    height: 50%;
    color: ${({ theme, bgColor1 }) => bgColor1 || theme.colors.white};
    padding-bottom: 20px;
  }
`;

const Section = styled(T.H4C)`
  display: inline-flex;
  background-color: ${({ theme, bgColor }) =>
    theme.colors[bgColor] || theme.colors.primary};
  padding: ${({ theme }) => `${theme.spacings[1]} ${theme.spacings[3]}`};
`;

const Title = withTheme(
  ({
    topTitle,
    bottomTitle,
    children,
    withBg,
    bgColor,
    textColor,
    section,
    mt,
    mb,
    ml,
    mr,
    caps = false,
    ...rest
  }) => {
    let _topText;
    let _bottomText;
    if (typeof children === 'string') {
      const splittedText = children.split(' ');
      const limit = splittedText.length;
      _topText =
        topTitle || splittedText.slice(0, Math.ceil(limit / 2)).join(' ');
      _bottomText =
        bottomTitle ||
        splittedText.slice(Math.ceil(limit / 2), limit + 1).join(' ');
    }
    if (withBg)
      return (
        <WithBackground
          bgColor={bgColor}
          mt={mt}
          mb={mb}
          ml={ml}
          mr={mr}
          color={textColor}
          {...rest}
        >
          {caps ? <T.H2C>{children}</T.H2C> : <T.H2>{children}</T.H2>}
        </WithBackground>
      );

    if (section)
      return (
        <Section
          color={textColor || 'white'}
          mt={mt}
          mb={mb}
          ml={ml}
          mr={mr}
          {...rest}
        >
          {children}
        </Section>
      );

    return (
      <AlternateTitle mt={mt} mb={mb} ml={ml} mr={mr} {...rest}>
        <div className="top">
          {caps ? (
            <T.H3C color="blue">{_topText}</T.H3C>
          ) : (
            <T.H3 color="blue">{_topText}</T.H3>
          )}
        </div>
        <div className="bottom">
          {caps ? (
            <T.H3C color="white" mr={1}>
              {_bottomText}
            </T.H3C>
          ) : (
            <T.H3 color="white" mr={1}>
              {_bottomText}
            </T.H3>
          )}
        </div>
      </AlternateTitle>
    );
  },
);

export default Title;
