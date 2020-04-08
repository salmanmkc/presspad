import React from 'react';

const Stop = ({ width, height, color, ...props }) => (
  // eslint-disable-next-line consistent-return
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 338.352 338.352"
    width={width}
    height={height}
    {...props}
  >
    <path
      d="M169.176 0C75.601 0 0 75.514 0 169.176s75.514 169.176 169.176 169.176 169.176-75.514 169.176-169.176S262.752 0 169.176 0zm-.001 315.732C87.986 315.731 22.62 250.366 22.62 169.176c0-36.553 13.245-69.924 35.263-95.553L264.73 280.47c-25.631 22.017-59.002 35.262-95.555 35.262zm111.294-51.003L73.622 57.883c25.63-22.017 59.001-35.263 95.554-35.263 81.191 0 146.556 65.365 146.556 146.556 0 36.553-13.245 69.923-35.263 95.553z"
      fill={color || 'currentColor'}
    />
  </svg>
);
export default Stop;
