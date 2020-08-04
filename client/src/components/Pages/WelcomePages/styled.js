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
  min-height: 200px;
`;

export const SubTitleContainer = styled.div`
  margin-top: -50px;
  @media ${({ theme }) => theme.breakpoints.mobileXL} {
    margin-top: -50px;
  }
  @media ${({ theme }) => theme.breakpoints.tablet} {
    margin-top: 50px;
  }
`;

export const ContentContainer = styled.div``;
