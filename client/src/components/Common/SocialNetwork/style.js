import styled from 'styled-components';

export const Wrapper = styled.section`
  width: 100%;
  min-height: 130px;
  background-image: url(${({ src }) => src});
  background-repeat: no-repeat;
  background-position: right top;
  background-size: 55px;

  @media ${({ theme: { breakpoints } }) => breakpoints.tablet} {
    background-size: auto;
    background-position: right bottom;
  }
`;

export const InnerWrapper = styled.section`
  width: 90%;
  display: flex;
  flex-direction: column;
`;

export const SocialIcons = styled.div`
  margin-top: 1rem;
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media ${({ theme: { breakpoints } }) => breakpoints.tablet} {
    width: 65%;
  }
`;
