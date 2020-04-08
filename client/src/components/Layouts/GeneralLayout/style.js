import styled from 'styled-components';
import { breakpoints } from '../../../theme';

export const Wrapper = styled.div`
  display: flex;
  padding-top: ${({ theme }) => theme.spacings.headerHeight};
`;

export const ContentWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  flex-direction: column;

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
