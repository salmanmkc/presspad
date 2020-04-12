import styled from 'styled-components';
import { breakpoints } from '../../../theme';

export const Wrapper = styled.main`
  padding-top: 80px;
`;

export const Logo = styled.img`
  width: 260px;
`;

export const Header = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 30px;

  //  all padding-left should be in line with right div layout percentages
  padding-left: 3%;

  @media ${breakpoints.mobileM} {
    padding-left: 7%;
  }

  @media ${breakpoints.tablet} {
    padding-left: 4%;
  }

  @media ${breakpoints.laptop} {
    padding-left: 5%;
  }

  @media ${breakpoints.laptopL} {
    padding-left: 7%;
  }
`;
