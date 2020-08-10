import React from 'react';

const Arrow2 = ({ width, height, color, ...props }) => (
  // eslint-disable-next-line consistent-return
  <svg
    width={width || '13'}
    height={height || '9'}
    viewBox="0 0 13 9"
    fill={color || 'currentColor'}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12.4535 4.89823C12.6488 4.70297 12.6488 4.38639 12.4535 4.19112L9.27156 1.00914C9.0763 0.813882 8.75972 0.813882 8.56445 1.00914C8.36919 1.20441 8.36919 1.52099 8.56445 1.71625L11.3929 4.54468L8.56445 7.3731C8.36919 7.56837 8.36919 7.88495 8.56445 8.08021C8.75972 8.27547 9.0763 8.27547 9.27156 8.08021L12.4535 4.89823ZM0 5.04468H12.1V4.04468H0L0 5.04468Z"
      fill={color || 'currentColor'}
    />
  </svg>
);
export default Arrow2;
