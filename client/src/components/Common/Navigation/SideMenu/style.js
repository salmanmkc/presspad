import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { ActiveLink } from '../Menu.style';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.nav`
  width: ${({ theme }) => theme.spacings.sideMenuWidth};
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.blue};
  padding: 40px 10px 10px 50px;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;

  ${ActiveLink};

  :after {
    content: '';
    position: absolute;
    width: ${({ theme }) => theme.spacings[6]};
    height: 100%;
    top: 0;
    right: 0;
    background-color: ${({ theme }) => theme.colors.darkBlue};
  }
`;

export const Logo = styled.img`
  width: 135px;
  left: -10px;
  margin-bottom: 80px;
`;

export const Link = styled(NavLink)`
  position: relative;
  width: auto;
  min-height: ${({ theme }) => theme.spacings[6]};
  margin-bottom: ${({ theme }) => theme.spacings[3]};
`;
