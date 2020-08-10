import styled from 'styled-components';
import { breakpoints } from '../../../theme';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media ${breakpoints.tablet} {
    flex-direction: row;
  }
`;

export const ContentWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  padding-left: 3%;
  padding-right: 3%;

  @media ${breakpoints.mobileL} {
    padding-left: 7%;
    padding-right: 7%;
  }

  @media ${breakpoints.tablet} {
    padding-left: 4%;
    padding-right: 4%;
  }

  @media ${breakpoints.laptop} {
    padding-left: 5%;
    padding-right: 5%;
  }

  @media ${breakpoints.laptopL} {
    padding-left: 7%;
    padding-right: 7%; /** 7% equal 100px on 1440px screens */
  }
`;

export const Content = styled.div`
  width: 100%;
  @media ${breakpoints.tablet} {
    padding-right: 500px;
  }
`;

export const SideBar = styled.div`
  background-color: ${({ theme }) => theme.colors.blue};
  position: relative;
  width: 100%;
  color: ${({ theme }) => theme.colors.white};

  @media ${breakpoints.mobileM} {
    padding: ${({ theme }) => `${theme.spacings[8]}  7% ${theme.spacings[8]} `};
  }

  @media ${breakpoints.tablet} {
    padding: ${({ theme }) => `${theme.spacings[8]}  4% ${theme.spacings[8]} `};
    position: fixed;
    height: 100vh;
    right: 0;
    width: 500px;
  }

  @media ${breakpoints.laptop} {
    padding: ${({ theme }) => `${theme.spacings[8]}  5% ${theme.spacings[8]} `};
  }

  @media ${breakpoints.laptopL} {
    padding: ${({ theme }) =>
      `${theme.spacings[8]}  7% ${theme.spacings[8]} `}; /** 7% equal 100px on 1440px screens */
  }
`;
