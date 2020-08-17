import styled from 'styled-components';
import { breakpoints } from '../../../theme';

export const Title = styled.h4`
  font-weight: bold;
  font-size: 1.875rem;
  letter-spacing: -0.03em;
  color: ${({ theme }) => theme.colors.white};
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme, marginBottom }) =>
    marginBottom ? theme.spacings[4] : 0};
`;

export const Line = styled.div`
  width: 4px;
  height: 40px;
  margin: 5px 0 0 12px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
`;

export const BlueDiv = styled.div`
  background: ${({ theme }) => theme.colors.blue};
  padding: ${({ theme }) =>
    `${theme.spacings[7]} ${theme.spacings[5]} ${theme.spacings[5]}`};

  @media ${breakpoints.mobileL} {
    padding: ${({ theme }) =>
      `${theme.spacings[7]} ${theme.spacings[7]} ${theme.spacings[5]}`};
  }
`;

export const DarkBlueDiv = styled.div`
  background: ${({ theme }) => theme.colors.darkBlue};
  padding: ${({ theme }) =>
    `${theme.spacings[7]} ${theme.spacings[5]} ${theme.spacings[5]}`};

  @media ${breakpoints.mobileL} {
    padding: ${({ theme }) =>
      `${theme.spacings[7]} ${theme.spacings[7]} ${theme.spacings[5]}`};
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media ${breakpoints.tablet} {
    flex-direction: row;
  }
`;

export const ColouredSideDiv = styled.div`
  width: ${({ position }) => (position === 'relative' ? '100vw' : '40%')};
  min-height: ${({ position }) =>
    position === 'relative' ? '441px' : '100vh'};
  position: ${({ position = 'static' }) => position};

  background: ${({ theme, color }) =>
    color ? theme.colors[color] : theme.colors.darkBlue};
  display: flex;
  flex-direction: column;

  margin-left: auto;

  ${({ position }) => {
    if (position === 'relative') {
      return `
        left: -3vw;

        @media ${breakpoints.mobileL} {
          left: -7vw;
        }

        @media ${breakpoints.tablet} {
          display: none
        }
    `;
    }
  }}
`;

export const ContentWrapper = styled.div`
  width: 100%;

  padding: 0 3% 0;

  @media ${breakpoints.mobileL} {
    padding: 0 7% 0;
  }

  @media ${breakpoints.tablet} {
    padding: 0 4% 0;
    width: 70%;
  }

  @media ${breakpoints.laptop} {
    padding: 0 5% 0;
  }

  @media ${breakpoints.laptopL} {
    padding: 0 7% 0; /** 7% equal 100px on 1440px screens */
  }
`;
