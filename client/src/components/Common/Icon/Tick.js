import React from 'react';

const Tick = props => (
  <svg
    width={props.width}
    height={props.height}
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M0 0.5H24V24.5H0V0.5Z" fill="white" />
    <path
      d="M21 12.5C21 7.53125 16.9688 3.5 12 3.5C7.03125 3.5 3 7.53125 3 12.5C3 17.4688 7.03125 21.5 12 21.5C16.9688 21.5 21 17.4688 21 12.5Z"
      stroke="#0AC7E7"
      strokeWidth="1.5"
      strokeMiterlimit="10"
    />
    <path
      d="M16.5 8.75L10.2 16.25L7.5 13.25"
      stroke="#0AC7E7"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Tick;
