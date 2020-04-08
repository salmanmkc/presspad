import React from 'react';

const CircleTick = ({ width, height, color, ...props }) => (
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
      d="M21 12c0-4.969-4.031-9-9-9s-9 4.031-9 9 4.031 9 9 9 9-4.031 9-9z"
      stroke={color || 'currentColor'}
      strokeWidth="1.5"
      strokeMiterlimit="10"
    />
    <path
      d="M16.5 8.25l-6.3 7.5-2.7-3"
      stroke={color || 'currentColor'}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default CircleTick;
