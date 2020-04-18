/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import {
  H1,
  H2,
  H3,
  H4,
  H1C,
  H2C,
  H3C,
  H4C,
  H5C,
  H6C,
  H7C,
  // Body
  PXL,
  PL,
  P,
  PBold,
  PS,
  PSBold,
  PXS,
  PXSBold,
  Link,
  SectionTitle,
} from '../components/Common/Typography';

export default {
  title: 'Typography',
};

export const Heading1 = () => <H1>Heading 1 (H1)</H1>;
export const Heading2 = () => <H2>Heading 2 (H2)</H2>;
export const Heading3 = () => <H3>Heading 3 (H3)</H3>;
export const Heading4 = () => <H4>Heading 4 (H4)</H4>;
export const Heading1Caps = () => <H1C>Heading 1 Caps (H1C)</H1C>;
export const Heading2Caps = () => <H2C>Heading 2 Caps (H2C)</H2C>;
export const Heading3Caps = () => <H3C>Heading 3 Caps (H3C)</H3C>;
export const Heading4Caps = () => <H4C>Heading 4 Caps (H4C)</H4C>;
export const Heading5Caps = () => <H5C>Heading 5 Caps (H5C)</H5C>;
export const Heading6Caps = () => <H6C>Heading 6 Caps (H6C)</H6C>;
export const Heading7Caps = () => <H7C>Heading 7 Caps (H7C)</H7C>;

const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna`;

export const PExtraLarge = () => (
  <PXL>
    Extra Large body text (PXL) <br />
    {loremIpsum}
  </PXL>
);

export const PLarge = () => (
  <PL>
    Large body text (PL) <br />
    {loremIpsum}
  </PL>
);

export const PNormal = () => (
  <P>
    normal body text (P) <br />
    {loremIpsum}
  </P>
);

export const PNormalBold = () => (
  <PBold>
    Bold body text (PBold) <br />
    {loremIpsum}
  </PBold>
);

export const PSmall = () => (
  <PS>
    Small body text (PS) <br />
    {loremIpsum}
  </PS>
);

export const PSmallBold = () => (
  <PSBold>
    Small Bold body text (PSBold) <br />
    {loremIpsum}
  </PSBold>
);
export const PExtraSmall = () => (
  <PXS>
    Extra Small body text (PXS) <br />
    {loremIpsum}
  </PXS>
);
export const PExtraSmallBold = () => (
  <PXSBold>
    Extra Small body text (PXSBold) <br />
    {loremIpsum}
  </PXSBold>
);

export const DefaultLink = () => <Link to="/#">Default link</Link>;
export const ExternalLink = () => (
  <Link to="https://www.google.com/" isExternal>
    External link
  </Link>
);

export const PinkHeading = () => <H1 color="pink">Heading 1 (H1)</H1>;
export const BlueBody = () => <P color="lightBlue"> {loremIpsum}</P>;

export const WithMargins = () => (
  <P mt="6" ml="4">
    mt => margin-top
    <br />
    mb => margin-bottom
    <br />
    ml => margin-left
    <br />
    mr => margin-right
    <br />
    {loremIpsum}
  </P>
);

export const RightBody = () => <P align="right"> {loremIpsum}</P>;
export const CenteredBody = () => <P align="center"> {loremIpsum}</P>;

export const SectionTitleExample = () => (
  <SectionTitle>Section Title</SectionTitle>
);
