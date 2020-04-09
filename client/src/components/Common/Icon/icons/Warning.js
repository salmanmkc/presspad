import React from 'react';

const Warning = ({ width, height, color, ...props }) => (
  // eslint-disable-next-line consistent-return
  <svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={width}
    height={height}
    {...props}
  >
    <g clipPath="url(#clip0)" fill={color || 'currentColor'}>
      <path d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0zm0 23C5.935 23 1 18.065 1 12S5.935 1 12 1s11 4.935 11 11-4.935 11-11 11z" />
      <path d="M10.04 17.44c0 .98.78 1.76 1.76 1.76.96 0 1.76-.78 1.76-1.76 0-.96-.8-1.76-1.76-1.76-.98 0-1.76.8-1.76 1.76zm.66-3.02h2.2L13.3 4h-3l.4 10.42z" />
    </g>
    <defs>
      <clipPath id="clip0">
        <path d="M0 0h24v24H0V0z" fill={color || 'currentColor'} />
      </clipPath>
    </defs>
  </svg>
);
export default Warning;
