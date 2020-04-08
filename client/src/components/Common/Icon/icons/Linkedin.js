import React from 'react';

const Linkedin = ({ width, height, color, ...props }) => (
  // eslint-disable-next-line consistent-return
  <svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 19 19"
    width={width}
    height={height}
    {...props}
  >
    <path
      d="M16.47 1.141H3.294c-.72 0-1.349.523-1.349 1.242v13.336c0 .723.63 1.367 1.35 1.367h13.17c.723 0 1.265-.648 1.265-1.367V2.383c.005-.719-.542-1.242-1.262-1.242zm-9.63 13.29H4.577V7.33h2.261v7.102zM5.786 6.25H5.77c-.724 0-1.193-.544-1.193-1.226 0-.693.481-1.225 1.221-1.225.74 0 1.193.528 1.21 1.225-.001.682-.47 1.226-1.222 1.226zm9.317 8.182h-2.261v-3.883c0-.93-.33-1.567-1.148-1.567-.625 0-.995.428-1.16.844-.06.15-.077.353-.077.56v4.046H8.196V7.33h2.262v.988c.329-.473.843-1.155 2.039-1.155 1.485 0 2.607.989 2.607 3.12v4.149z"
      fill={color || 'currentColor'}
    />
  </svg>
);
export default Linkedin;
