import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { breakpoints } from '../../../theme';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media ${breakpoints.tablet} {
    flex-direction: row;
  }
`;

export const ColouredSideDiv = styled.div`
  width: 50%;
  background: ${({ theme, color = 'pink' }) => theme.colors[color]};
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  position: fixed;
  min-height: 100vh;
  right: 0;
`;

export const ContentWrapper = styled.div`
  width: 100%;

  padding: ${() => `0 3% 0`};

  @media ${breakpoints.mobileM} {
    padding: ${() => `0 7% 0`};
  }

  @media ${breakpoints.tablet} {
    padding: ${() => `0 4% 0`};
    width: 50%;
  }

  @media ${breakpoints.laptop} {
    padding: ${() => `0 5% 0`};
  }

  @media ${breakpoints.laptopL} {
    padding: ${() => `0 7% 0`}; /** 7% equal 100px on 1440px screens */
  }
`;

export const ColouredTopDiv = styled.div`
  background: ${({ theme, color = 'pink' }) => theme.colors[color]};
  min-height: fit-content;
  overflow: hidden;
  padding: ${({ theme }) => theme.spacings[6]};
`;

export const Image = styled.img`
  max-width: 600px;
  width: 80%;
`;

export const TopImage = styled.img`
  max-width: 100%;
  height: 150%;
`;

export const StyledLink = styled(NavLink)`
  position: absolute;
  top: 25px;
  right: ${({ right }) => right && '30px'};
  lwft: ${({ left }) => left && '30px'};
`;

export const Logo = styled.img`
  width: 110px;
`;
