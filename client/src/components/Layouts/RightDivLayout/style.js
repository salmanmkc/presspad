import styled from 'styled-components';
import { breakpoints } from '../../../theme';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media ${breakpoints.tablet} {
    flex-direction: row;
    padding-right: ${({ theme }) => `${theme.spacings.rightDivWidth}`};
  }
`;

export const ContentWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  padding: ${({ theme }) =>
    `${theme.spacings.rightDivLayout.top} 3% ${theme.spacings.rightDivLayout.bottom}`};

  @media ${breakpoints.mobileM} {
    padding: ${({ theme }) =>
      `${theme.spacings.rightDivLayout.top} 7% ${theme.spacings.rightDivLayout.bottom}`};
  }

  @media ${breakpoints.tablet} {
    padding: ${({ theme }) =>
      `${theme.spacings.rightDivLayout.top} 4% ${theme.spacings.rightDivLayout.bottom}`};
  }

  @media ${breakpoints.laptop} {
    padding: ${({ theme }) =>
      `${theme.spacings.rightDivLayout.top} 5% ${theme.spacings.rightDivLayout.bottom}`};
  }

  @media ${breakpoints.laptopL} {
    padding: ${({ theme }) =>
      `${theme.spacings.rightDivLayout.top} 7% ${theme.spacings.rightDivLayout.bottom}`}; /** 7% equal 100px on 1440px screens */
  }
`;

export const Content = styled.div`
  width: 100%;
`;

export const SideBar = styled.div`
  background-color: ${({ theme }) => theme.colors.blue};
  position: relative;
  width: 100%;
  color: ${({ theme }) => theme.colors.white};

  @media ${breakpoints.mobileM} {
    padding: ${({ theme }) =>
      `${theme.spacings.rightDivLayout.top} 7% ${theme.spacings.rightDivLayout.bottom}`};
  }

  @media ${breakpoints.tablet} {
    padding: ${({ theme }) =>
      `${theme.spacings.rightDivLayout.top} 4% ${theme.spacings.rightDivLayout.bottom}`};
    position: fixed;
    height: 100vh;
    right: 0;
    width: 500px;
  }

  @media ${breakpoints.laptop} {
    padding: ${({ theme }) =>
      `${theme.spacings.rightDivLayout.top} 5% ${theme.spacings.rightDivLayout.bottom}`};
  }

  @media ${breakpoints.laptopL} {
    padding: ${({ theme }) =>
      `${theme.spacings.rightDivLayout.top} 7% ${theme.spacings.rightDivLayout.bottom}`}; /** 7% equal 100px on 1440px screens */
  }
`;
