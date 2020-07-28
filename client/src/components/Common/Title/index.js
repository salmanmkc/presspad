import React from 'react';
import styled, { css, withTheme } from 'styled-components';
import * as T from '../Typography';

const sharedStyles = css`
  padding-left: 120px;
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
  }

  & .bottom {
    ${sharedStyles};
    background-color: ${({ theme, bgColor2 }) => bgColor2 || theme.colors.blue};
    width: 100%;
    height: 50%;
    color: ${({ theme, bgColor1 }) => bgColor1 || theme.colors.white};
  }
`;

const Title = withTheme(({ children }) => {
  let topText;
  let bottomText;
  if (typeof children === 'string') {
    const splittedText = children.split(' ');
    const limit = splittedText.length - 1;
    topText = splittedText.slice(0, Math.ceil(limit / 2)).join(' ');
    bottomText = splittedText.slice(Math.ceil(limit / 2), limit + 1).join(' ');
  }
  return (
    <AlternateTitle>
      <div className="top">
        <T.H3C style={{ color: 'inherit' }}>{topText}</T.H3C>
      </div>
      <div className="bottom">
        <T.H3C style={{ color: 'inherit' }}>{bottomText}</T.H3C>
      </div>
    </AlternateTitle>
  );
});

export default Title;
