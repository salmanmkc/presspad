import styled from 'styled-components';
import { breakpoints } from '../../../theme';

export const Wrapper = styled.div`
  /* display: flex; */
  padding-top: ${({ isLoggedIn }) => (isLoggedIn ? 0 : '80px')};
`;

export const ContentWrapper = styled.div`
  display: flex;
  width: ${({ isLoggedIn, largerThanTablet }) =>
    isLoggedIn && largerThanTablet ? 'calc(100% - 245px)' : '100%'};
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
