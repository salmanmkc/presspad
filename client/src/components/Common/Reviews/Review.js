import React from 'react';

import { Rate } from 'antd';

// Typography
import * as T from '../Typography';
import {
  ReviewWrapper,
  ReviewHeader,
  SubTitle,
  ReviewBody,
} from './Reviews.style';

const Review = ({ rate, name, jobTitle, message }) => (
  <ReviewWrapper>
    <ReviewHeader>
      <T.PBold style={{ paddingRight: '0.5rem' }}>
        {name}, {jobTitle}
      </T.PBold>{' '}
      <Rate disabled defaultValue={rate} style={{ color: '#5EBFD0' }} />
    </ReviewHeader>
    <T.P>{message}</T.P>
  </ReviewWrapper>
);

export default Review;
