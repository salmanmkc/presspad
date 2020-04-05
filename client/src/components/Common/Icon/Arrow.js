import React from 'react';

const Arrow = ({ width, height, color }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 16 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.25 1.625L8 8.375L14.75 1.625"
      stroke={color}
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Arrow;
