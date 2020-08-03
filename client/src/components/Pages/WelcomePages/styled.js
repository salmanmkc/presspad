import styled from 'styled-components';

export const TitleContainer = styled.div`
  position: relative;
  width: 100%;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    position: absolute;
    width: 37%;
    min-width: 450px;
    left: 0;
  }
`;

export const SubTitleContainer = styled.div`
margin-top: 30px;
margin-bottom: 10px;
@media ${({ theme }) => theme.breakpoints.tablet} {
  padding-top: 170px;

`;
