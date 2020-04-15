import React from 'react';

const Close = ({ width, height, color, ...props }) => (
  // eslint-disable-next-line consistent-return
  <svg
    width={width}
    height={height}
    {...props}
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21.5625 21.5625L8.4375 8.4375"
      stroke="black"
      strokeWidth="1.52344"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21.5625 8.4375L8.4375 21.5625"
      stroke="black"
      strokeWidth="1.52344"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default Close;
