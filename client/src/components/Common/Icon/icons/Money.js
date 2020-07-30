import React from 'react';

const Money = ({ width, height, color, ...props }) => (
  // eslint-disable-next-line consistent-return
  <svg
    width={width}
    height={height}
    viewBox="0 0 40 34"
    fill={'none' || color}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0)">
      <path
        d="M36.4866 11.3439C36.6897 11.6944 12.9475 26.5981 10.1792 27.2603C9.76182 26.6877 4.6396 16.7695 3.98375 17.2281C7.01234 15.1077 10.3297 13.6054 13.549 11.8141C18.9337 8.80535 25.5659 5.33889 30.1308 1.19672C33.1798 4.03836 34.4186 7.8728 36.4866 11.3439Z"
        stroke="#08294A"
        strokeWidth="1.18228"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24.5444 13.6348C24.2195 9.34361 18.4833 11.112 17.1759 13.7823C14.202 19.9104 24.9532 19.0561 24.5444 13.6348Z"
        fill="#F4F4F4"
        stroke="#08294A"
        strokeWidth="1.18228"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.83343 16.2143C8.92951 16.4418 7.9347 17.2093 7.02208 17.4499C8.08941 18.3068 7.96476 19.2319 8.49355 20.2361"
        stroke="#08294A"
        strokeWidth="1.18228"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.60088 22.8502C9.9218 23.5027 10.7696 24.0511 11.1437 24.7461C12.9062 23.8539 14.6234 22.8131 16.3417 21.8163"
        stroke="#08294A"
        strokeWidth="1.18228"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26.0423 6.88861C27.3666 6.12671 28.7134 5.42494 29.8927 4.49039C30.3125 4.97939 30.6527 5.53096 30.9009 6.12499"
        stroke="#08294A"
        strokeWidth="1.18228"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28.528 13.9925C30.2913 13.1933 31.485 11.7345 33.1863 10.8775C32.9368 10.3059 32.6305 9.50276 32.1852 9.04379"
        stroke="#08294A"
        strokeWidth="1.18228"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.42317 19.1584C4.41064 19.7714 3.33504 20.2745 2.21484 20.6589C5.29387 23.1582 7.23427 28.8443 9.33769 32.1934C17.6673 25.9908 27.1966 21.7393 35.6889 15.8738C35.0689 14.6417 34.8218 14.2434 34.1156 13.0527"
        stroke="#08294A"
        strokeWidth="1.18228"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect
          width="35.6395"
          height="17.5548"
          fill="white"
          transform="matrix(0.866771 -0.498706 0.501296 0.865276 0 17.9219)"
        />
      </clipPath>
    </defs>
  </svg>
);
export default Money;