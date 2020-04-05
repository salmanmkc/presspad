import styled from 'styled-components';
import { breakpoints } from '../../../theme';

export const Wrapper = styled.div`
  display: flex;
  padding-top: ${({ topHeaderRendered, theme }) =>
    topHeaderRendered ? theme.spacings.headerHeight : 0};
`;

export const ContentWrapper = styled.div`
  display: flex;
  width: ${({ sideMenuRendered, theme }) =>
    sideMenuRendered ? `calc(100% - ${theme.spacings.sideMenuWidth})` : '100%'};
  padding: 120px 3%;

  @media ${breakpoints.mobileM} {
    padding: 120px 7%;
  }

  @media ${breakpoints.tablet} {
    padding: 120px 4%;
  }

  @media ${breakpoints.laptop} {
    padding: 120px 5%;
  }

  @media ${breakpoints.laptopL} {
    padding: 120px 7%; /** 7% equal 100px on 1440px screens */
  }
`;

export const Content = styled.div`
  width: 100%;
`;
