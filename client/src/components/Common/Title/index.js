import React from 'react';
import styled, { css, withTheme } from 'styled-components';
import * as T from '../Typography';

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

const WithBackground = styled.div`
  display: flex;
  justify-content: center;
  padding: 15px 0;
  background-color: ${({ theme, bgColor }) =>
    theme.colors[bgColor] || theme.colors.pink};
`;

const Section = styled(T.H4C)`
  display: inline-flex;
  background-color: ${({ theme, bgColor }) =>
    theme.colors[bgColor] || theme.colors.primary};
  padding: ${({ theme }) => `${theme.spacings[1]} ${theme.spacings[3]}`};
`;

const Title = withTheme(
  ({
    children,
    withBg,
    bgColor,
    textColor,
    section,
    mt,
    mb,
    ml,
    mr,
    ...rest
  }) => {
    let topText;
    let bottomText;
    if (typeof children === 'string') {
      const splittedText = children.split(' ');
      const limit = splittedText.length;
      topText = splittedText.slice(0, Math.ceil(limit / 2)).join(' ');
      bottomText = splittedText
        .slice(Math.ceil(limit / 2), limit + 1)
        .join(' ');
    }
    if (withBg)
      return (
        <WithBackground
          bgColor={bgColor}
          mt={mt}
          mb={mb}
          ml={ml}
          mr={mr}
          {...rest}
        >
          <T.H2C color={textColor || 'white'}>{children}</T.H2C>
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
          <T.H3C style={{ color: 'inherit' }}>{topText}</T.H3C>
        </div>
        <div className="bottom">
          <T.H3C style={{ color: 'inherit' }}>{bottomText}</T.H3C>
        </div>
      </AlternateTitle>
    );
  },
);

export default Title;