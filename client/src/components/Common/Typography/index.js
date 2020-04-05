import React from 'react';
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Heading7,
} from './style';

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
  <Heading7 caps {...props}>
    {children}
  </Heading7>
);

export { H1, H2, H3, H4, H1C, H2C, H3C, H4C, H5C, H6C, H7C };
