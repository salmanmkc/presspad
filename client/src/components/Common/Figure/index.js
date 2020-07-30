import React from 'react';
import * as T from '../Typography';

const Figure = ({ stats, title, statsColor, titleColor }) => (
  <div>
    <T.H1
      color={statsColor || 'pink'}
      style={{ textAlign: 'center', lineHeight: 1 }}
    >
      {stats}
    </T.H1>
    <T.H5 color={titleColor || 'blue'} style={{ textAlign: 'center' }}>
      {title}
    </T.H5>
  </div>
);

export default Figure;
