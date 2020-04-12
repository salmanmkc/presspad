import styled from 'styled-components';
import { breakpoints } from '../../../theme';

export const Wrapper = styled.main`
  margin-top: 80px;
  position: relative;
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

export const LoginDetails = styled.div`
  position: relative;
  padding: 10px 0;
  margin-bottom: ${({ theme }) => theme.spacings[6]};

  :after {
    content: '';
    position: absolute;
    height: 100%;
    width: calc(100vw - 30px);
    left: -10px;
    top: 0;
    z-index: -1;
    background-color: ${({ theme }) => theme.colors.lightestGray};
  }
`;

export const List = styled.ul`
  list-style-type: none;
`;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
`;
