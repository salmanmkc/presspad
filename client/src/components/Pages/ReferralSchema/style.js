import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-bottom: 0px;
  @media ${({ theme: { breakpoints } }) => breakpoints.tablet} {
    margin-bottom: 250px;
  }
`;

export const Content = styled.div`
  width: 100%;
  position: relative;

  @media ${({ theme: { breakpoints } }) => breakpoints.tablet} {
    width: ${(7 / 12) * 100}%;
  }
`;

export const SideDiv = styled.div`
  background: ${({ theme }) => theme.colors.pink};
  min-height: 100vh;
  width: ${(4 / 12) * 100}%;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  display: none;
  z-index: -1;
  @media ${({ theme: { breakpoints } }) => breakpoints.tablet} {
    display: block;
  }
`;

export const Image = styled.img`
  width: 47vw;
  bottom: 0;
  right: 15%;
  max-width: 600px;
  position: static;
  min-width: 300px;
  @media ${({ theme: { breakpoints } }) => breakpoints.tablet} {
    position: absolute;
  }
`;
