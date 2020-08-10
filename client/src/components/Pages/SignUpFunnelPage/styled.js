import styled from 'styled-components';

export const Container = styled.div`
  min-height: 300px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: ${({ index }) => index && '30px'};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    width: 80%;
    min-height: 470px;
    margin-top: 0;
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

export const ButtonContainer = styled.div`
  margin-top: 20px;
  margin-bottom: ${({ lastButton }) => lastButton && '50px'};
  @media ${({ theme }) => theme.breakpoints.tablet} {
    margin-top: auto;
    margin-bottom: 0px;
  }
`;

export const Title = styled.h1`
  font-family: Glacial Indifference;
  font-style: normal;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.blue};
  margin-top: 30px;
  font-size: 40px;
  line-height: ${({ caps }) => (caps ? '40px' : '50px')};

  @media ${({ theme }) => theme.breakpoints.tablet} {
    margin-top: 50px;
    font-size: 60px;
    line-height: 80px;
  }
`;
