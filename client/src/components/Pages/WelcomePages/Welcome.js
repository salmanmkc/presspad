import React from 'react';

import ProgressBar from '../../Common/ProgressBar';

const Welcome = () => {
  console.log('get started');

  return (
    <div>
      <ProgressBar number={4} current={1} color="pink" />
    </div>
  );
};

export default Welcome;
