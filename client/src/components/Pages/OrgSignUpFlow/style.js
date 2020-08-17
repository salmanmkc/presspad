import styled from 'styled-components';
import * as T from '../../Common/Typography';

export const SubTitle = styled(T.H4).attrs({ color: 'blue' })`
  @media ${({ theme: { breakpoints } }) => breakpoints.tablet} {
    font-size: 30px;
    line-height: 40px;
  }
`;

export const Paragraph = styled(T.PS).attrs({ color: 'blue' })`
  font-size: 20px;
  line-height: 30px;
`;

export const IllustrativeBox = styled.div`
  width: 100vw;
  height: 441px;

  @media ${({ theme: { breakpoints } }) => breakpoints.tablet} {
    display: none;
  }
`;

export const Error = styled(T.PXS)`
  color: ${({ theme }) => theme.colors.pink};
  padding-left: ${({ theme }) => theme.spacings[2]};
  padding-top: ${({ theme }) => theme.spacings[1]};
`;

export const Opportunities = styled.div``;

export const Link = styled(T.PBold)`
  cursor: pointer;
`;
