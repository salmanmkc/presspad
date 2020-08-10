import React from 'react';

import { Rate } from 'antd';

// Typography
import * as T from '../Typography';
import { ReviewWrapper } from './index.style';

const Review = ({ rate, name, message }) => (
  <ReviewWrapper>
    <Rate
      disabled
      defaultValue={rate}
      style={{
        marginTop: '1rem',
        marginBottom: '0.5rem',
      }}
    />
    <T.PBold color="fontLightBlack">{name}</T.PBold>
    <T.PXS color="fontLightBlack">{message}</T.PXS>
  </ReviewWrapper>
);

export default Review;
