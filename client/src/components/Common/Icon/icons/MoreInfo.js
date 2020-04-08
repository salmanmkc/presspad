import React from 'react';

const MoreInfo = ({ width, height, color, ...props }) => (
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
      <path d="M10.18 17.46c0 .96.78 1.74 1.74 1.74.98 0 1.76-.78 1.76-1.74 0-.98-.78-1.76-1.76-1.76-.96 0-1.74.78-1.74 1.76zm3-5.76c0-1.38 2.84-1.88 2.84-4.24 0-2.52-2.06-3.66-4.12-3.66-2.44 0-4.18 1.32-4.2 4.08h2.54c-.1-1.16.54-1.82 1.66-1.82.78 0 1.58.34 1.58 1.4 0 1.42-2.86 1.32-2.86 4.24v2.98h2.56V11.7z" />
    </g>
    <defs>
      <clipPath id="clip0">
        <path d="M0 0h24v24H0V0z" fill={color || 'currentColor'} />
      </clipPath>
    </defs>
  </svg>
);
export default MoreInfo;
