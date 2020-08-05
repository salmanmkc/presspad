import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';
import { H5C } from '../Typography';

export const Header = styled(H5C)`
  font-size: ${({ isMobile }) => !isMobile && '18px'};
  color: ${({ theme }) => theme.colors.white};
  min-width: auto;
  max-width: ${({ isMobile }) => (isMobile ? '300px' : '195px')};
  text-align: ${({ horizontal }) => horizontal && 'right'};
  position: ${({ horizontal }) => (horizontal ? 'relative' : 'absolute')};
  margin-left: ${({ horizontal, theme }) => horizontal && theme.spacings[4]};
  background: ${({ isLogIn, isLogInActive, theme }) => {
    if (isLogIn) {
      return isLogInActive ? theme.colors.white : theme.colors.pink;
    }
    return 'inherit';
  }};
  height: ${({ isLogIn }) => isLogIn && '45px'};
  line-height: ${({ isLogIn }) => isLogIn && '45px'};
  width: ${({ isLogIn }) => isLogIn && '120px'};
  text-align: ${({ isLogIn }) => isLogIn && 'center'};
  border-radius: ${({ isLogIn }) => isLogIn && '10px'};
`;

export const Link = styled(NavLink)`
  position: relative;
  min-height: ${({ theme }) => theme.spacings[5]};
  min-width: ${({ isMobile, theme }) => isMobile && theme.spacings[11]};
  margin-bottom: ${({ horizontal, theme }) => !horizontal && theme.spacings[3]};
`;

export const MenuButton = styled.button`
  text-decoration: none;
  border: none;
  background-color: ${({ theme }) => theme.colors.blue};
  position: relative;
  min-height: ${({ theme }) => theme.spacings[5]};
  min-width: ${({ isMobile, theme }) => isMobile && theme.spacings[11]};
  margin-bottom: ${({ horizontal, theme }) => !horizontal && theme.spacings[3]};
  margin-left: ${({ horizontal, theme }) => horizontal && theme.spacings[4]};
  cursor: pointer;
`;

export const ButtonHeader = styled(H5C)`
  color: ${({ theme }) => theme.colors.white};
  text-align: ${({ horizontal }) => (horizontal ? 'right' : 'left')};
`;

export const ActiveLink = css`
  .active {
    h1,
    h2,
    h3,
    h4,
    h5 {
      color: black;
      :before {
        z-index: -1;
        content: '';
        left: -5px;
        top: 0;
        position: absolute;
        background-color: white;
        width: calc(100% + 20px);
        height: 100%;
      }
    }
  }
`;

export const HorizontalActiveLink = css`
  .active {
    h1,
    h2,
    h3,
    h4,
    h5 {
      color: black;
      :before {
        z-index: -1;
        content: '';
        left: -5px;
        top: 0;
        position: absolute;
        background-color: white;
        width: calc(100% + 10px);
        height: 100%;
      }
    }
  }
`;
