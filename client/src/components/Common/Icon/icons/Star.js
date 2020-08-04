import React from 'react';

const Star = ({ width, height, color, ...props }) => (
  // eslint-disable-next-line consistent-return

  <svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 15 14"
    width={width}
    height={height}
    {...props}
  >
    <path
      d="M14.219 4.634L10.13 4.06 8.303.48c-.328-.637-1.276-.645-1.606 0L4.869 4.06.78 4.634C.047 4.737-.247 5.61.285 6.11l2.958 2.783-.7 3.931c-.125.71.65 1.243 1.299.91L7.5 11.879l3.657 1.857c.65.33 1.425-.2 1.299-.91l-.7-3.932 2.958-2.783c.532-.5.238-1.373-.495-1.476z"
      fill={color || 'currentColor'}
    />
  </svg>
);
export default Star;
