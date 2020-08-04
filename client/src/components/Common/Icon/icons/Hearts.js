import React from 'react';

const Hearts = ({ width, height, color, ...props }) => (
  // eslint-disable-next-line consistent-return

  <svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 85 63"
    width={width}
    height={height}
    {...props}
  >
    <path
      d="M46.618 20.063c8.64 13.92-21.022 35.567-30.614 41.655C10.035 53.284-3.17 26.586 2.64 17.368 9.877 5.928 20.332 21.401 21.925 29.13c4.97-5.644 17.987-19.865 24.693-9.068zM83.025 3.86c2.933 6.659-6.674 15.386-10.868 19.247-2.163-3.353-10.09-15.315-7.673-19.587 2.656-4.757 11.098.982 10.139 3.963 1.561-4.772 5.874-9.354 8.402-3.623z"
      stroke={color || '#D83D7E'}
      strokeWidth="2.378"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default Hearts;
