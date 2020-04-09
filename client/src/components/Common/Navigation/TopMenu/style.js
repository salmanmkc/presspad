import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { ActiveLink, HorizontalActiveLink } from '../Menu.style';

export const Wrapper = styled.nav`
  position: fixed;
  display: flex;
  width: 100vw;
  background-color: ${({ theme }) => theme.colors.blue};
  z-index: 10;
  top: 0;
  box-sizing: border-box;
  height: ${({ open, theme }) =>
    open ? '100vh' : theme.spacings.headerHeight};
  flex-direction: ${({ open }) => open && 'column'};
  justify-content: ${({ open }) => (open ? 'flex-start' : 'flex-end')};
  align-items: ${({ open }) => (open ? 'flex-start' : 'center')};
  padding-top: ${({ open }) => open && '160px'};
  padding-left: ${({ open, theme }) =>
    open && theme.spacings.sideMenuLayout.top};
  padding-right: ${({ isMobile, theme }) => !isMobile && theme.spacings[6]};

  ${({ isMobile }) => (isMobile ? ActiveLink : HorizontalActiveLink)}
`;

export const Logo = styled.img`
  width: 110px;
`;

export const StyledLink = styled(NavLink)`
  position: absolute;
  top: 25px;
  left: 30px;
`;
