import styled from 'styled-components';

export const H = styled.div`
  height: 200px;
  width: 100%;
`;

export const TitleContainer = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  @media (max-width: ${({ theme }) => theme.size.tablet}) {
    position: relative;
  }
  @media ${({ theme }) => theme.breakpoints.tablet} {
    width: 37%;
    min-width: 450px;
    left: 0;
    top: 100px;
  }
`;

export const TitleWrapper = styled.div`
  min-height: fit-content;
  margin-bottom: 20px;
  position: absolute;
  left: 0;
  width: 100%;
  @media (max-width: ${({ theme }) => theme.size.tablet}) {
    position: relative;
    width: calc(100% + 6%);
    left: -3%;
  }

  @media ${({ theme }) => theme.breakpoints.tablet} {
    position: static;
    min-height: 200px;
    margin-bottom: 0px;
    width: auto;
  }
`;

export const SubTitleContainer = styled.div`
  margin-bottom: 10px;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    margin-top: 50px;
  }
`;

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 80px;
`;

export const ContentContainer = styled.div``;
