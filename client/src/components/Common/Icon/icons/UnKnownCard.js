import React from 'react';

const User = ({ width, height, color, ...props }) => (
  <svg
    width={width || '22'}
    height={height || '18'}
    viewBox="0 0 22 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M18.125 1.5H3.875C2.42525 1.5 1.25 2.67525 1.25 4.125V13.875C1.25 15.3247 2.42525 16.5 3.875 16.5H18.125C19.5747 16.5 20.75 15.3247 20.75 13.875V4.125C20.75 2.67525 19.5747 1.5 18.125 1.5Z"
      stroke={color || '#585858'}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1.25 6H20.75"
      stroke={color || '#585858'}
      strokeWidth="2.8125"
      strokeLinejoin="round"
    />
    <path
      d="M7.25 11.0625H5V12H7.25V11.0625Z"
      stroke={color || '#585858'}
      strokeWidth="2.8125"
      strokeLinejoin="round"
    />
  </svg>
);

export default User;
