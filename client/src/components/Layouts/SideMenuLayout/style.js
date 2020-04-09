import styled from 'styled-components';
import { breakpoints } from '../../../theme';

export const Wrapper = styled.div`
  display: flex;
  padding-top: ${({ topHeaderRendered, theme }) =>
    topHeaderRendered ? theme.spacings.headerHeight : 0};
  padding-left: ${({ sideMenuRendered, theme }) =>
    sideMenuRendered && `${theme.spacings.sideMenuWidth}`};
`;

export const ContentWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: ${({ theme }) =>
    `${theme.spacings.sideMenuLayout.top} 3% ${theme.spacings.sideMenuLayout.bottom}`};

  @media ${breakpoints.mobileM} {
    padding: ${({ theme }) =>
      `${theme.spacings.sideMenuLayout.top} 7% ${theme.spacings.sideMenuLayout.bottom}`};
  }

  @media ${breakpoints.tablet} {
    padding: ${({ theme }) =>
      `${theme.spacings.sideMenuLayout.top} 4% ${theme.spacings.sideMenuLayout.bottom}`};
  }

  @media ${breakpoints.laptop} {
    padding: ${({ theme }) =>
      `${theme.spacings.sideMenuLayout.top} 5% ${theme.spacings.sideMenuLayout.bottom}`};
  }

  @media ${breakpoints.laptopL} {
    padding: ${({ theme }) =>
      `${theme.spacings.sideMenuLayout.top} 7% ${theme.spacings.sideMenuLayout.bottom}`}; /** 7% equal 100px on 1440px screens */
  }
`;

export const Content = styled.div`
  width: 100%;
`;

export const GoBackWrapper = styled.div`
  position: absolute;
  top: 2rem;
`;
