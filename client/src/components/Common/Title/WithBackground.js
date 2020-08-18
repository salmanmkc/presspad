import React from 'react';
import styled from 'styled-components';

const PageTitleWrapper = styled.div`
  @media ${({ theme: { breakpoints } }) => breakpoints.tablet} {
    width: 500px;
    height: 80px;
    margin-top: ${({ theme, mt }) => theme.spacings[mt || 8]};
    margin-bottom: ${({ theme, mb }) => theme.spacings[mb || 6]};
    margin-left: ${({ theme, ml }) => theme.spacings[ml]};
    margin-right: ${({ theme, mr }) => theme.spacings[mr]};
  }
`;

export const PageTitle = styled.div`
  height: 50px;
  margin-top: ${({ theme, mt }) => theme.spacings[mt || 6]};
  margin-bottom: ${({ theme, mb }) => theme.spacings[mb || 5]};
  margin-left: ${({ theme, ml }) => theme.spacings[ml]};
  margin-right: ${({ theme, mr }) => theme.spacings[mr]};
  color: ${({ theme, color }) => theme.colors[color] || theme.colors.pink};
  display: flex;
  align-items: center;

  & > h2 {
    color: ${({ theme, color }) => theme.colors[color] || theme.colors.blue};
  }

  @media ${({ theme: { breakpoints } }) => breakpoints.tablet} {
    width: 500px;
    height: 80px;
    position: absolute;
    left: 0;
    top: 0;
    padding-left: 4vw;
    margin-top: ${({ theme, mt }) => theme.spacings[mt || 8]};
    margin-bottom: ${({ theme, mb }) => theme.spacings[mb || 6]};
    & > h2 {
      color: ${({ theme }) => theme.colors.white};
    }
    background-color: ${({ theme, bgColor }) =>
      theme.colors[bgColor] || theme.colors.pink};
  }
  @media ${({ theme: { breakpoints } }) => breakpoints.laptop} {
    padding-left: 5vw;
  }
  @media ${({ theme: { breakpoints } }) => breakpoints.laptopL} {
    padding-left: 7vw;
  }
`;

export default function WithBackground({ children, ...rest }) {
  return (
    <PageTitleWrapper {...rest}>
      <PageTitle {...rest}>{children}</PageTitle>
    </PageTitleWrapper>
  );
}
