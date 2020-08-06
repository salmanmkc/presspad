import styled from 'styled-components';

export const Container = styled.div`
  min-height: 300px;
  width: 100%;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    width: 80%;
    min-height: 420px;
  }
  @media ${({ theme }) => theme.breakpoints.laptop} {
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
