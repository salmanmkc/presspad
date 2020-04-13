import React, { useReducer } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Input, Rate, message } from 'antd';

import { H4C, P, PBold, PXS } from '../../../Common/Typography';
import ButtonNew from '../../../Common/ButtonNew';

import { Wrapper, TextAreaWrapper } from './LeaveReview.style';

import { leaveReview } from '../../../../constants/errorMessages';
import { API_REVIEW_URL } from '../../../../constants/apiRoutes';

const { TextArea } = Input;

const Star = () => (
  <svg
    viewBox="64 64 896 896"
    focusable="false"
    className=""
    data-icon="star"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z" />

    <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" />
  </svg>
);

const initialState = {
  review: null,
  rating: 0,
  text: '',
  loading: false,
  error: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'submitedReview':
      return { ...state, review: action.value, loading: false };
    case 'changeRate':
      return { ...state, rating: action.value, error: '' };
    case 'changeText':
      return { ...state, text: action.value, error: '' };
    case 'isLoading':
      return { ...state, loading: true };
    case 'isValidationError':
      return { ...state, error: action.error, text: action.value };
    case 'isError':
      return { ...state, error: action.error, loading: false };
    default:
      throw new Error();
  }
};

const LeaveReview = ({ bookingId, toId, toName, reviews, userId }) => {
  const history = useHistory();
  const [state, dispatch] = useReducer(reducer, initialState);

  const userReviews = reviews.filter(review => review.from._id === userId);
  if (userReviews[0]) {
    return null;
  }

  const { review, text, rating, error, loading } = state;

  const handleTextChange = ({ target: { value } }) => {
    if (message.length < 50) {
      dispatch({
        type: 'isValidationError',
        value,
        error: leaveReview.TEXTAREA,
      });
      return;
    }
    dispatch({ type: 'changeText', value });
  };

  const handleRateChange = value => {
    dispatch({ type: 'changeRate', value });
  };

  const handleSubmit = async () => {
    if (text.length < 50) {
      dispatch({ type: 'isError', error: leaveReview.TEXTAREA });
    } else {
      dispatch({ type: 'isLoading' });
      try {
        const { data } = await axios.post(
          API_REVIEW_URL.replace(':id', bookingId),
          {
            to: toId,
            from: userId,
            rating,
            message: text,
          },
        );
        message
          .success('Submited review succesfully')
          .then(() => dispatch({ type: 'submitedReview', value: data }));
      } catch (err) {
        const errorResponse = err.response.data.error;
        if (errorResponse.includes('You have already submitted')) {
          message.error(errorResponse, 4).then(() => history.go(0));
        }
        dispatch({ type: 'isError', error: errorResponse });
      }
    }
  };

  return review ? null : (
    <Wrapper>
      <H4C mb="4">leave a review</H4C>
      <P>
        Now that {toName}’s stay has finished, we’d love you to leave a review
        on their profile. This will help Will find other hosts if they ever need
        to and also will improve the PressPad community.
      </P>
      <PBold mt="4" mb="3">
        Rating
      </PBold>
      <Rate
        allowHalf
        value={rating}
        character={<Star />}
        onChange={handleRateChange}
      />
      <PBold mt="5" mb="2">
        Review
      </PBold>
      <TextAreaWrapper>
        <TextArea
          rows={6}
          value={text}
          placeholder="Write your review here..."
          onChange={handleTextChange}
        />
        {error && <PXS color="pink">{error}</PXS>}
      </TextAreaWrapper>
      <ButtonNew type="primary" loading={loading} onClick={handleSubmit}>
        send review
      </ButtonNew>
    </Wrapper>
  );
};

export default LeaveReview;
