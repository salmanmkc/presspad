import React from 'react';

const Twitter = ({ width, height, color, ...props }) => (
  // eslint-disable-next-line consistent-return
  <svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 19 19"
    width={width}
    height={height}
    {...props}
  >
    <g clipPath="url(#clip0)">
      <path
        d="M17.833 4.659a7.055 7.055 0 01-1.993.544 3.464 3.464 0 001.527-1.907 6.925 6.925 0 01-2.204.836 3.464 3.464 0 00-2.534-1.093c-1.918 0-3.47 1.545-3.47 3.45a3.35 3.35 0 00.09.786 9.812 9.812 0 01-3.953-1.04 9.907 9.907 0 01-3.2-2.566 3.432 3.432 0 00-.471 1.734c0 1.195.617 2.252 1.55 2.872a3.409 3.409 0 01-1.578-.43v.042a3.456 3.456 0 002.784 3.38c-.298.081-.606.122-.914.122-.22 0-.438-.021-.653-.064a3.472 3.472 0 003.244 2.395A6.987 6.987 0 01.92 15.147a9.749 9.749 0 005.311 1.56c6.39 0 9.882-5.258 9.882-9.817 0-.15-.004-.299-.011-.445a7.032 7.032 0 001.73-1.786z"
        fill={color || 'currentColor'}
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <path
          d="M.356.761h18.04v18.223H.356V.76z"
          fill={color || 'currentColor'}
        />
      </clipPath>
    </defs>
  </svg>
);
export default Twitter;
