import React from 'react';

const Cross = ({ width, height, color, ...props }) => (
  // eslint-disable-next-line consistent-return
  <svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={width}
    height={height}
    {...props}
  >
    <path
      d="M17.25 17.25L6.75 6.75"
      stroke={color || 'currentColor'}
      strokeWidth="1.658"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={color || 'currentColor'}
    />
    <path
      d="M17.25 6.75l-10.5 10.5"
      stroke={color || 'currentColor'}
      strokeWidth="1.658"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={color || 'currentColor'}
    />
  </svg>
);
export default Cross;
