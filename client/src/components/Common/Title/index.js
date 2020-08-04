import React from 'react';
import styled, { css, withTheme } from 'styled-components';
import * as T from '../Typography';

const sharedStyles = css`
  padding-left: 30px;
  min-width: 380px;
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
  background-color: ${({ theme, bgColor }) => bgColor || theme.colors.pink};
`;

const Title = withTheme(({ children, withBg, topTitle, bottomTitle }) => {
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
  return withBg ? (
    <WithBackground>
      <T.H2C color="white">{children}</T.H2C>
    </WithBackground>
  ) : (
    <AlternateTitle>
      <div className="top">
        <T.H3C style={{ color: 'inherit' }}>{_topText}</T.H3C>
      </div>
      <div className="bottom">
        <T.H3C style={{ color: 'inherit' }}>{_bottomText}</T.H3C>
      </div>
    </AlternateTitle>
  );
});

export default Title;
