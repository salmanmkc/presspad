import React from 'react';
import * as S from './style';
import * as T from '../Typography';
import Icon from '../Icon';

const ratingArr = [1, 2, 3, 4, 5];

const Reviews = ({ reviews }) => (
  <S.Wrapper>
    <S.Title mb={5}>Recent Reviews</S.Title>
    {reviews && reviews.length > 0 ? (
      reviews.map(review => (
        <S.Review>
          <S.Ratings>
            {ratingArr.map(rating => (
              <Icon
                icon="star"
                width="15px"
                height="auto"
                color={rating <= review.rate ? 'pink' : 'lighterGray'}
              />
            ))}
          </S.Ratings>
          <T.PBold color="black">
            {review.name && review.name.split(' ')[0]}
            {review.subtitle ? `, ${review.subtitle}` : `, intern`}
          </T.PBold>
          <T.PXS color="black">{review.message}</T.PXS>
        </S.Review>
      ))
    ) : (
      <T.P>No reviews to show</T.P>
    )}
  </S.Wrapper>
);

export default Reviews;
