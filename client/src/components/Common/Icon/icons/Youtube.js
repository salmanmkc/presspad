import React from 'react';

const Youtube = ({ width, height, color, ...props }) => (
  // eslint-disable-next-line consistent-return
  <svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 19 19"
    width={width}
    height={height}
    {...props}
  >
    <g clipPath="url(#clip0)">
      <path
        d="M18.096 6.02c0-1.602-1.166-2.89-2.607-2.89a126.86 126.86 0 00-5.977-.128h-.634c-2.03 0-4.024.036-5.976.128C1.464 3.13.298 4.426.298 6.027a53.478 53.478 0 00-.123 3.801 55.663 55.663 0 00.12 3.805c0 1.601 1.166 2.9 2.603 2.9 2.05.096 4.154.14 6.293.136 2.142.007 4.24-.038 6.293-.136 1.441 0 2.607-1.299 2.607-2.9.085-1.27.124-2.538.12-3.808a52.236 52.236 0 00-.115-3.805zm-10.628 7.3V6.326l5.11 3.495-5.11 3.499z"
        fill={color || 'currentColor'}
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <path
          d="M.175.724h18.04v18.223H.175V.724z"
          fill={color || 'currentColor'}
        />
      </clipPath>
    </defs>
  </svg>
);
export default Youtube;
