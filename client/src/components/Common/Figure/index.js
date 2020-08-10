import React from 'react';
import * as T from '../Typography';

const Figure = ({ stats, title, statsColor, titleColor, small }) => (
  <div>
    <T.H1
      color={statsColor || 'pink'}
      style={{ lineHeight: 1, fontSize: small && '30px' }}
    >
      {stats}
    </T.H1>
    <T.H5 color={titleColor || 'blue'} style={{ fontSize: small && '18px' }}>
      {title}
    </T.H5>
  </div>
);

export default Figure;
