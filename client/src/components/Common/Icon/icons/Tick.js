import React from 'react';

const Tick = ({ width, height, color, ...props }) => (
  // eslint-disable-next-line consistent-return
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 511.999 511.999"
    width={width}
    height={height}
    {...props}
  >
    <path
      d="M506.231 75.508c-7.689-7.69-20.158-7.69-27.849 0l-319.21 319.211L33.617 269.163c-7.689-7.691-20.158-7.691-27.849 0-7.69 7.69-7.69 20.158 0 27.849l139.481 139.481c7.687 7.687 20.16 7.689 27.849 0l333.133-333.136c7.69-7.691 7.69-20.159 0-27.849z"
      fill={color || 'currentColor'}
    />
  </svg>
);
export default Tick;
