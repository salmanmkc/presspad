import React from 'react';

const Money = ({ width, height, color, ...props }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 41 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M36.9061 11.4842C37.1137 11.8439 13.1593 26.95 10.3599 27.6113C9.93397 27.0232 4.68911 16.8482 4.02767 17.3135C7.08206 15.1622 10.4325 13.6449 13.6819 11.8314C19.1169 8.78524 25.8125 5.27816 30.4107 1.06787C33.5148 3.99229 34.7916 7.92165 36.9061 11.4842Z"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M24.8273 13.7577C24.4732 9.36647 18.675 11.1419 17.3668 13.8656C14.3912 20.1166 25.273 19.3054 24.8273 13.7577Z"
      fill={color}
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.94664 16.3106C9.03264 16.538 8.02978 17.3172 7.10705 17.558C8.19286 18.4407 8.07205 19.3862 8.61339 20.4165"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.74935 23.097C10.0781 23.7662 10.9399 24.3322 11.3227 25.0452C13.1023 24.1429 14.835 23.0883 16.5691 22.0788"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M26.3054 6.86584C27.6418 6.09424 29.0016 5.38427 30.1903 4.43522C30.6182 4.93785 30.9659 5.50402 31.2207 6.11309"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M28.8627 14.1469C30.6436 13.3397 31.8438 11.8544 33.5616 10.9878C33.3055 10.4017 32.9907 9.57838 32.5371 9.10632"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.49733 19.2964C4.47562 19.9175 3.3894 20.4258 2.25732 20.8125C5.3898 23.3869 7.38795 29.2143 9.5375 32.6523C17.9359 26.3564 27.5605 22.0632 36.1256 16.1131C35.4905 14.8492 35.238 14.4404 34.516 13.2183"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default Money;
