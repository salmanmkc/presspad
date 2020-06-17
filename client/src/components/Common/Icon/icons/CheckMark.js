import React from 'react';

const CheckMark = ({ width, height, color, ...props }) => (
  // eslint-disable-next-line consistent-return
  <svg
    width={width}
    height={height}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M19 10C19 5.03125 14.9688 1 10 1C5.03125 1 1 5.03125 1 10C1 14.9688 5.03125 19 10 19C14.9688 19 19 14.9688 19 10Z"
      stroke={color}
      strokeWidth="1.5"
      strokeMiterlimit="10"
    />
    <path
      d="M14.5 6.25L8.2 13.75L5.5 10.75"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default CheckMark;
