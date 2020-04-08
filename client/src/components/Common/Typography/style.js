import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const CommonStyle = css`
  font-family: Glacial Indifference;
  font-style: normal;
  font-weight: bold;
  color: ${({ theme, color }) =>
    color ? theme.colors[color] : theme.colors.black};
  text-transform: ${({ caps }) => (caps ? 'uppercase' : 'none')};
  margin-top: ${({ mt, theme }) => (mt ? theme.spacings[mt] : 0)};
  margin-bottom: ${({ mb, theme }) => (mb ? theme.spacings[mb] : 0)};
  margin-left: ${({ ml, theme }) => (ml ? theme.spacings[ml] : 0)};
  margin-right: ${({ mr, theme }) => (mr ? theme.spacings[mr] : 0)};
  text-align: ${({ align }) => align || 'left'};
`;

export const Heading1 = styled.h1`
  ${CommonStyle};
  font-size: 60px;
  line-height: 78px;
`;

export const Heading2 = styled.h2`
  ${CommonStyle};
  font-size: 40px;
  line-height: 52px;
`;

export const Heading3 = styled.h3`
  ${CommonStyle};
  font-size: 30px;
  line-height: 39px;
`;

export const Heading4 = styled.h4`
  ${CommonStyle};
  font-size: 22px;
  line-height: 26px;
`;

export const Heading5 = styled.h5`
  ${CommonStyle};
  font-size: 20px;
  line-height: 30px;
`;

export const Heading6 = styled.h6`
  ${CommonStyle};
  font-size: 18px;
  line-height: 23px;
  color: ${({ theme, color }) =>
    color ? theme.colors[color] : theme.colors.gray};
`;

export const Heading7 = styled.h6`
  ${CommonStyle};
  font-size: 14px;
  line-height: 14px;
  letter-spacing: 0.03em;
`;

const CommonParagraphStyle = css`
  ${CommonStyle};
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
  color: ${({ theme, color }) =>
    color ? theme.colors[color] : theme.colors.darkerGray};
`;

export const BodyXL = styled.p`
  ${CommonParagraphStyle};
  font-size: 26px;
  line-height: 39px;
`;

export const BodyL = styled.p`
  ${CommonParagraphStyle};
  font-size: 22px;
  line-height: 33px;
`;

export const Body = styled.p`
  ${CommonParagraphStyle};
  font-size: 18px;
  line-height: 27px;
`;

export const BodyB = styled.p`
  ${CommonParagraphStyle};
  font-weight: bold;
  font-size: 20px;
  line-height: 30px;
`;

export const BodyS = styled.p`
  ${CommonParagraphStyle};
  font-size: 18px;
  line-height: 27px;
`;

export const BodyXS = styled.p`
  ${CommonParagraphStyle};
  font-size: 14px;
  line-height: 21px;
`;

export const StyledLink = styled(Link)`
  ${CommonStyle};
  font-size: 20px;
  line-height: 30px;
`;
