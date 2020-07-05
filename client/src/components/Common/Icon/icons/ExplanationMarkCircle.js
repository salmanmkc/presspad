import React from 'react';

const ExplanationMarkCircle = ({ width, height, color, ...props }) => (
  // eslint-disable-next-line consistent-return
  <svg
    width={width}
    height={height}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 0C8.97219 0 0 8.97219 0 20C0 31.0278 8.97219 40 20 40C31.0278 40 40 31.0278 40 20C40 8.97219 31.0278 0 20 0ZM20 38.3334C9.89094 38.3334 1.66664 30.1091 1.66664 20C1.66664 9.89094 9.89094 1.66664 20 1.66664C30.1091 1.66664 38.3334 9.89094 38.3334 20C38.3334 30.1091 30.1091 38.3334 20 38.3334Z"
      fill="#FFDF59"
    />
    <path
      d="M16.7333 29.0667C16.7333 30.7 18.0333 32 19.6667 32C21.2667 32 22.6 30.7 22.6 29.0667C22.6 27.4667 21.2667 26.1333 19.6667 26.1333C18.0333 26.1333 16.7333 27.4667 16.7333 29.0667ZM17.8333 24.0333H21.5L22.1667 6.66666H17.1667L17.8333 24.0333Z"
      fill="#FFDF59"
    />
  </svg>
);
export default ExplanationMarkCircle;
