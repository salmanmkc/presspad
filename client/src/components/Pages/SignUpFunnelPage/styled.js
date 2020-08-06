import styled from 'styled-components';

export const Container = styled.div`
  min-height: 300px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    width: 80%;
    min-height: 470px;
  }
  @media ${({ theme }) => theme.breakpoints.laptop} {
    min-height: 430px;
  }

  @media (min-width: 1150px) {
    min-height: 380px;
  }
  @media (min-width: 1275px) {
    min-height: 360px;
  }
  @media (min-width: 1350) {
    min-height: 450px;
  }
`;
export const Wrapper = styled.div`
  padding: 0 20px;
  @media ${({ theme }) => theme.breakpoints.mobileL} {
    padding: 0 30px;
  }
  @media ${({ theme }) => theme.breakpoints.tablet} {
    padding-left: 120px;
  }
`;
