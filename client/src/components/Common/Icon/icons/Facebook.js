import React from 'react';

const Facebook = ({ width, height, color, ...props }) => (
  // eslint-disable-next-line consistent-return
  <svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 19 19"
    width={width}
    height={height}
    {...props}
  >
    <path
      d="M16.041 1.141H2a.867.867 0 00-.616.258.885.885 0 00-.256.622v14.185c0 .233.092.457.256.622a.868.868 0 00.616.258H9.02v-6.264H7.133V8.544H9.02V6.729c0-2.06 1.414-3.18 3.235-3.18.872 0 1.809.066 2.027.095v2.15H12.83c-.991 0-1.18.474-1.18 1.172v1.578h2.36l-.307 2.278H11.65v6.264h4.39a.868.868 0 00.616-.258.885.885 0 00.256-.622V2.02a.885.885 0 00-.256-.622.867.867 0 00-.616-.258z"
      fill={color || 'currentColor'}
    />
  </svg>
);
export default Facebook;
