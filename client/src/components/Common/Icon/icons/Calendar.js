import React from 'react';

const Calendar = ({ width, height, color, ...props }) => (
  // eslint-disable-next-line consistent-return

  <svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    width={width}
    height={height}
    {...props}
  >
    <path
      d="M13 2.5H3A1.5 1.5 0 001.5 4v9A1.5 1.5 0 003 14.5h10a1.5 1.5 0 001.5-1.5V4A1.5 1.5 0 0013 2.5z"
      stroke={color}
      strokeWidth="2.309"
      strokeLinejoin="round"
    />
    <path
      d="M12.432 2.5H3.568c-1.14 0-2.068.942-2.068 2.1v1.9H2c0-.5.5-1 1-1h10c.5 0 1 .5 1 1h.5V4.6c0-1.158-.928-2.1-2.068-2.1zM9.25 8a.75.75 0 100-1.5.75.75 0 000 1.5zM11.75 8a.75.75 0 100-1.5.75.75 0 000 1.5zM9.25 10.5a.75.75 0 100-1.5.75.75 0 000 1.5zM11.75 10.5a.75.75 0 100-1.5.75.75 0 000 1.5zM4.25 10.5a.75.75 0 100-1.5.75.75 0 000 1.5zM6.75 10.5a.75.75 0 100-1.5.75.75 0 000 1.5zM4.25 13a.75.75 0 100-1.5.75.75 0 000 1.5zM6.75 13a.75.75 0 100-1.5.75.75 0 000 1.5zM9.25 13a.75.75 0 100-1.5.75.75 0 000 1.5z"
      fill={color}
    />
    <path
      d="M4 1.5v1M12 1.5v1"
      stroke={color}
      strokeWidth="2.309"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default Calendar;
