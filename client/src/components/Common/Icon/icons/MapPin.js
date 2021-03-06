import React from 'react';

const MapPin = ({ width, height, color, ...props }) => (
  // eslint-disable-next-line consistent-return
  <svg
    width={width}
    height={height}
    viewBox="0 0 17 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1 7.38281C1 3.31193 4.3645 0 8.5 0C12.6355 0 16 3.31193 16 7.38281C16 8.71742 15.6342 10.0254 14.9421 11.1653L9.14033 20.7009C9.02837 20.885 8.82704 20.9983 8.60908 21H8.60413C8.38804 21 8.18713 20.8901 8.07308 20.7092L2.11954 11.265C1.38704 10.1005 1 8.75823 1 7.38281ZM8.59467 19.2029L13.8694 10.5336C14.4454 9.58486 14.7542 8.4952 14.7542 7.38281C14.7542 3.99041 11.9462 1.22227 8.5 1.22227C5.05375 1.22227 2.24167 3.99041 2.24167 7.38281C2.24167 8.5292 2.57225 9.64745 3.18196 10.6167L8.59467 19.2029Z"
      fill={color || 'currentColor'}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5 7.5C5 5.5701 6.5701 4 8.5 4C10.4299 4 12 5.5701 12 7.5C12 9.39649 10.4796 11 8.5 11C6.54455 11 5 9.41757 5 7.5ZM6.15889 7.5C6.15889 8.78983 7.20667 9.84111 8.5 9.84111C9.81382 9.84111 10.8372 8.77101 10.8372 7.5C10.8372 6.2134 9.7866 5.15889 8.5 5.15889C7.2134 5.15889 6.15889 6.2134 6.15889 7.5Z"
      fill={color || 'currentColor'}
    />
  </svg>
);
export default MapPin;
