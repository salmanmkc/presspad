import React from 'react';

const Chevron = ({ width, height, color, ...props }) => (
  // eslint-disable-next-line consistent-return

  <svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 21 21"
    width={width}
    height={height}
    {...props}
  >
    <path
      d="M4.594 7.547l5.906 5.906 5.906-5.906"
      stroke={color || 'currentColor'}
      strokeWidth="1.969"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default Chevron;
