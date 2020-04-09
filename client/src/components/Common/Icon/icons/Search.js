import React from 'react';

const Search = ({ width, height, color, ...props }) => (
  // eslint-disable-next-line consistent-return
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 52.966 52.966"
    width={width}
    height={height}
    {...props}
  >
    <path
      d="M51.704 51.273L36.845 35.82c3.79-3.801 6.138-9.041 6.138-14.82 0-11.58-9.42-21-21-21s-21 9.42-21 21 9.42 21 21 21c5.083 0 9.748-1.817 13.384-4.832l14.895 15.491a.998.998 0 001.414.028 1 1 0 00.028-1.414zM21.983 40c-10.477 0-19-8.523-19-19s8.523-19 19-19 19 8.523 19 19-8.524 19-19 19z"
      fill={color || 'currentColor'}
    />
  </svg>
);
export default Search;
