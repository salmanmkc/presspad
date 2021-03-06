import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import margins from '../../../helpers/margins';

const CommonStyle = css`
  ${margins};

  font-family: Glacial Indifference;
  font-style: normal;
  font-weight: bold;
  color: ${({ theme, color }) =>
    (color && (theme.colors[color] || color)) || theme.colors.black};
  text-transform: ${({ caps }) => (caps ? 'uppercase' : 'none')};

  text-align: ${({ align }) => align || 'left'};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'unset')};
  width: auto;
`;

export const Heading0 = styled.h1`
  ${CommonStyle};
  font-size: 130px;
  line-height: 150px;
`;

export const Heading1 = styled.h1`
  ${CommonStyle};
  font-size: 60px;
  line-height: 80px;
`;

export const Heading2 = styled.h2`
  ${CommonStyle};
  font-size: 40px;
  line-height: ${({ caps }) => (caps ? '40px' : '50px')};
`;

export const Heading3 = styled.h3`
  ${CommonStyle};
  font-size: 30px;
  line-height: 40px;
`;

export const Heading4 = styled.h4`
  ${CommonStyle};
  font-size: 24px;
  line-height: 30px;
`;

export const Heading5 = styled.h5`
  ${CommonStyle};
  font-size: 20px;
  line-height: 30px;
`;

export const Heading6 = styled.h6`
  ${CommonStyle};
  font-size: 18px;
  line-height: 25px;
  color: ${({ theme, color }) =>
    color ? theme.colors[color] : theme.colors.gray};
`;

export const Heading7 = styled.h6`
  ${CommonStyle};
  font-size: 14px;
  line-height: 14px;
  letter-spacing: 0.03em;
`;

export const Heading8 = styled.h6`
  ${CommonStyle};
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.1em;
`;

const CommonParagraphStyle = css`
  ${CommonStyle};
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
  color: ${({ theme, color, disabled }) => {
    if (disabled) return 'rgba(0,0,0,.25)';
    if (color) return theme.colors[color];
    return theme.colors.darkerGray;
  }};
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
  font-size: 16px;
  line-height: 27px;
`;

export const BodyB = styled.p`
  ${CommonParagraphStyle};
  font-weight: bold;
  font-size: 16px;
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
  font-size: ${({ fz }) => (fz ? `${fz}px` : '14px')};
  cursor: pointer;
  font-weight: ${({ light }) => (light ? 'normal' : 'bold')};
`;

export const StyledSectionTitle = styled.header`
  position: relative;
  height: 80px;
  margin-bottom: ${({ theme }) => theme.spacings[4]};

  h3 {
    padding-left: 30px;
    position: absolute;
    left: 0;
    top: 0px;
    padding-top: 10px;
    padding-bottom: 10px;
    width: auto;
    :after {
      content: ' ';
      z-index: -1;
      position: absolute;
      left: 0;
      top: 0;
      width: calc(100% + 80px);
      height: 100%;
      background-color: ${({ theme }) => theme.colors.lightestGray};
    }
  }
`;

export const StyledSpan = styled.span`
  font-weight: ${({ weight }) => weight && weight};
`;
