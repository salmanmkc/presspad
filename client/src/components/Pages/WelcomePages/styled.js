import styled from 'styled-components';

export const TitleContainer = styled.div`
  position: relative;
  width: 100%;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    position: absolute;
    width: 37%;
    min-width: 450px;
    left: 0;
    top: 100px;
  }
`;

export const TitleWrapper = styled.div`
  margin-top: 0px;
  min-height: auto;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    margin-top: 50px;
    min-height: 80px;
  }

  @media (max-width: 1150px) {
    margin-top: 100px;
  }

  @media (max-width: 1250px) {
    margin-top: 100px;
  }

  @media (max-width: 1100px) {
    margin-top: 120px;
  }

  @media (max-width: 1040px) {
    margin-top: 140px;
  }

  @media (max-width: 985px) {
    margin-top: 160px;
  }

  @media (max-width: 950px) {
    margin-top: 20px;
  }
`;

export const SubTitleContainer = styled.div`
  margin-top: -50px;
  @media ${({ theme }) => theme.breakpoints.mobileXL} {
    margin-top: -120px;
  }
  @media ${({ theme }) => theme.breakpoints.tablet} {
    margin-top: 0px;
  }
`;

export const ContentContainer = styled.div``;
