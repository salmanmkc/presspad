import React from 'react';
import { Heading1, Heading2, Heading3, Heading4 } from './style';

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

export { H1, H2, H3, H4, H1C, H2C, H3C, H4C };
