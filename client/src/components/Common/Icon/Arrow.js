import React from 'react';

const Arrow = ({ width, height, color, direction }) => {
  let degree = '';

  switch (direction) {
    case 'left':
      degree = '-90';
      break;
    case 'right':
      degree = '90';
      break;
    case 'up':
      degree = '180';
      break;
    case 'down':
      degree = '-180';
      break;

    default:
      break;
  }
  // eslint-disable-next-line consistent-return
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      transform={`rotate(${degree})`}
    >
      <path
        d="M18.75 15.375L12 8.625L5.25 15.375"
        stroke={color}
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Arrow;
