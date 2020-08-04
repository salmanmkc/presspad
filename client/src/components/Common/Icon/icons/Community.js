import React from 'react';

const Community = ({ width, height, color, ...props }) => (
  // eslint-disable-next-line consistent-return
  <svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 99"
    width={width}
    height={height}
    {...props}
  >
    <path
      d="M25.795 60.469c8.544-1.615 12.637-2.673 18.03-10.144 5.526-7.612 7.839-18.736 12.221-27.139 2.054-3.967.572-10.371 3.136-13.664 4.013-5.22 7.776 3.207 7.988 6.272.407 5.785-1.45 10.74-3.261 15.929-3.81 10.81 3.762 10.457 11.907 8.38 4.14-1.05 8.757-3.63 13.115-3.285 7.361.58 4.03 6.444 5.487 11.461.784 2.752 3.214 3.089 3.975 5.62.933 3.136-.839 4.916-.635 7.11.486 5.214 1.78 5.394.494 8.38-.4.941-1.568 2.039-1.905 4.085-.196 1.332 1.129 2.853.698 4.601-2.728 10.975-28.221 7.745-35.041 6.664-10.607-1.67-14.11 1.458-25.234 3.057"
      stroke="#393C63"
      strokeWidth="2.352"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.678 97.704C15.98 95.658.938 63.471 3.948 62.742c6.78-1.639 14.11-3.434 21.047-4.006 1.654-.133 6.922 13.89 7.589 15.6a65.48 65.48 0 013.77 16.54c-1.317.408-20.083 5.629-19.676 6.828z"
      fill={color || 'currentColor'}
      stroke="#393C63"
      strokeWidth="2.352"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M29.22 85.734c-.149-3.441-4.703-4.218-6.467-1.38-3.026 4.907 6.663 5.903 6.467 1.38z"
      fill="#fff"
      stroke="#393C63"
      strokeWidth="2.352"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20.95 4.019c2.9 6.585-6.6 15.216-10.74 19.033C8.055 19.736.215 7.907 2.622 3.682c2.618-4.704 10.975.972 10.018 3.92 1.553-4.72 5.817-9.25 8.31-3.583z"
      stroke={color || 'currentColor'}
      strokeWidth="2.352"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default Community;
