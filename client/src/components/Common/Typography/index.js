import React from 'react';
import {
  Heading0,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Heading7,
  Heading8,
  BodyXL,
  BodyL,
  Body,
  BodyB,
  BodyS,
  BodyXS,
  StyledLink,
  StyledSectionTitle,
  StyledSpan,
} from './style';

const H0 = ({ children, ...props }) => (
  <Heading0 {...props}>{children}</Heading0>
);

const H1 = ({ children, ...props }) => (
  <Heading1 {...props}>{children}</Heading1>
);

const H2 = ({ children, ...props }) => (
  <Heading2 {...props}>{children}</Heading2>
);

const H3 = ({ children, ...props }) => (
  <Heading3 {...props}>{children}</Heading3>
);

const H4 = ({ children, ...props }) => (
  <Heading4 {...props}>{children}</Heading4>
);

const H5 = ({ children, ...props }) => (
  <Heading5 {...props}>{children}</Heading5>
);

const H0C = ({ children, ...props }) => (
  <H0 caps {...props}>
    {children}
  </H0>
);

const H1C = ({ children, ...props }) => (
  <H1 caps {...props}>
    {children}
  </H1>
);

const H2C = ({ children, ...props }) => (
  <H2 caps {...props}>
    {children}
  </H2>
);
const H3C = ({ children, ...props }) => (
  <H3 caps {...props}>
    {children}
  </H3>
);

const H4C = ({ children, ...props }) => (
  <H4 caps {...props}>
    {children}
  </H4>
);

const H5C = ({ children, ...props }) => (
  <Heading5 caps {...props}>
    {children}
  </Heading5>
);

const H6C = ({ children, ...props }) => (
  <Heading6 caps {...props}>
    {children}
  </Heading6>
);

const H7C = ({ children, ...props }) => (
  <Heading7 caps color={props.color || 'gray'} {...props}>
    {children}
  </Heading7>
);

const H8C = ({ children, ...props }) => (
  <Heading8 caps {...props}>
    {children}
  </Heading8>
);

const PXL = ({ children, ...props }) => <BodyXL {...props}>{children}</BodyXL>;
const PL = ({ children, ...props }) => <BodyL {...props}>{children}</BodyL>;
const PLBold = ({ children, ...props }) => <BodyL {...props}>{children}</BodyL>;
const P = ({ children, ...props }) => <Body {...props}>{children}</Body>;
const PBold = ({ children, ...props }) => <BodyB {...props}>{children}</BodyB>;
const PS = ({ children, ...props }) => <BodyS {...props}>{children}</BodyS>;
const PSBold = ({ children, ...props }) => (
  <BodyS bold {...props}>
    {children}
  </BodyS>
);
const PXS = ({ children, ...props }) => <BodyXS {...props}>{children}</BodyXS>;
const PXSBold = ({ children, ...props }) => (
  <BodyXS bold {...props}>
    {children}
  </BodyXS>
);

const Link = ({ children, to, isExternal, caps, fz, ...props }) => (
  <StyledLink
    to={isExternal ? undefined : to}
    href={!isExternal ? undefined : to}
    as={!isExternal ? undefined : 'a'}
    rel={!isExternal ? undefined : 'noopener noreferrer'}
    target={!isExternal ? undefined : '_blank'}
    {...props}
    caps={caps}
    fz={fz}
  >
    {children}
  </StyledLink>
);

const SectionTitle = ({ children, ...props }) => (
  <StyledSectionTitle {...props}>
    <H3C>{children}</H3C>
  </StyledSectionTitle>
);

const Span = ({ children, ...props }) => (
  <StyledSpan {...props}>{children}</StyledSpan>
);

export {
  // Heading
  H1,
  H2,
  H3,
  H4,
  H5,
  H0C,
  H1C,
  H2C,
  H3C,
  H4C,
  H5C,
  H6C,
  H7C,
  H8C,
  // Body
  PXL,
  PL,
  P,
  PBold,
  PLBold,
  PS,
  PSBold,
  PXS,
  PXSBold,
  Link,
  SectionTitle,
  Span,
};
