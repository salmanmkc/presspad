import styled, { css } from 'styled-components';

const CommonHeading = css`
  font-family: Glacial Indifference;
  font-style: normal;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.black};
  text-transform: ${({ isCaps }) => (isCaps ? 'uppercase' : 'none')};
`;

export const Heading1 = styled.h1`
  ${CommonHeading};
  font-size: 60px;
  line-height: 78px;
`;

export const Heading2 = styled.h2`
  ${CommonHeading};
  font-size: 40px;
  line-height: 52px;
`;

export const Heading3 = styled.h3`
  ${CommonHeading};
  font-size: 30px;
  line-height: 39px;
`;

export const Heading4 = styled.h4`
  ${CommonHeading};
  font-size: 22px;
  line-height: 26px;
`;
