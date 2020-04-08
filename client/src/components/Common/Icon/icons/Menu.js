import React from 'react';

const Menu = ({ width, height, color, ...props }) => (
  // eslint-disable-next-line consistent-return
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 33 33"
    width={width}
    height={height}
    {...props}
  >
    <path
      d="M5.156 10.313h22.688M5.156 16.5h22.688M5.156 22.688h22.688"
      stroke={color || 'currentColor'}
      strokeWidth="2.063"
      strokeMiterlimit="10"
      strokeLinecap="round"
      fill={color || 'currentColor'}
    />
  </svg>
);
export default Menu;
