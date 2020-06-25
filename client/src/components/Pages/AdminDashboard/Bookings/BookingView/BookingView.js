import React from 'react';
import * as S from './style';

import GoBackComponent from '../../../../Common/GoBack';

// import { ADMIN_DASHBOARD_URL } from '../../../../../constants/navRoutes';

// TODO ADD GO BACK BUTTON TO GO BACK AND TOGGLE SEARCH BAR
const BookingReview = ({ toggleSearchBar, toggleBookingView, ...props }) => (
  // console.log('props', props);

  <>
    <S.GoBackWrapper>
      <GoBackComponent
        onClick={() => {
          toggleSearchBar();
          toggleBookingView();
        }}
      />
    </S.GoBackWrapper>
  </>
);
export default BookingReview;
