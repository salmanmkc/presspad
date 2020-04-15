import React from 'react';

import { Rate } from 'antd';

// Typography
import * as T from '../Typography';
import { ReviewWrapper, ReviewHeader, SubTitle } from './Reviews.style';

const Review = ({ rate, name, jobTitle, message }) => (
  <ReviewWrapper>
    <ReviewHeader>
      <SubTitle>
        {name}, {jobTitle}
      </SubTitle>
      <Rate
        disabled
        defaultValue={rate}
        style={{ color: '#5EBFD0', lineHeight: '5' }}
      />
    </ReviewHeader>
    <T.P style={{ marginTop: '-1.75rem' }}>{message}</T.P>
  </ReviewWrapper>
);

export default Review;
