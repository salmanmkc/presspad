import styled from 'styled-components';
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

  @media ${breakpoints.mobileL} {
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
  height: 30vw;
  overflow: hidden;
  display: flex;
  justify-content: ${({ isImage }) => (isImage ? 'flex-end' : 'center')};
  align-items: ${({ isImage }) => (isImage ? 'flex-start' : 'center')};
  padding: ${({ isImage, theme }) =>
    isImage ? '0 10% 0 0' : theme.spacings[5]};
`;

export const Image = styled.img`
  max-width: 600px;
  width: 80%;
`;

export const TopImage = styled.img`
  max-width: 100%;
  height: 150%;
`;
