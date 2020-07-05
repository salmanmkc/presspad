import React from 'react';
import moment from 'moment';
import * as S from './style';
import * as T from '../Typography';
import Icon from '../Icon';
import { truncateString, formatPrice } from '../../../helpers';
import { tidyStatusText } from '../../../helpers/tidyStatusText';
import { TABLET_WIDTH } from '../../../constants/screenWidths';

import { BOOKING_VIEW_URL } from '../../../constants/navRoutes';

const BookingCards = ({
  startDate,
  endDate,
  price,
  withUser = '',
  withUserType = '',
  bookingID,
  type,
  bio = '',
  interests = [],
  status = '',
  windowWidth,
  role,
}) => {
  const isMobile = windowWidth < TABLET_WIDTH;

  const datesRangeStyle = {
    big: {
      desktop: T.H1,
      mobile: T.H2,
    },
    small: {
      desktop: T.H2,
      mobile: T.H4C,
    },
  };

  const dateMonthStyle = {
    big: {
      desktop: T.H5C,
      mobile: T.H6C,
    },
    small: {
      desktop: T.H6C,
      mobile: T.H8C,
    },
  };

  const nameStyle = {
    desktop: T.H3,
    mobile: T.PBold,
  };

  const DatesRange = datesRangeStyle[type][isMobile ? 'mobile' : 'desktop'];
  const DateMonth = dateMonthStyle[type][isMobile ? 'mobile' : 'desktop'];

  const Name = nameStyle[isMobile ? 'mobile' : 'desktop'];

  const startDay = moment(startDate).format('DD');
  const endDay = moment(endDate).format('DD');
  const startMonth = moment(startDate).format('MMM');
  const endMonth = moment(endDate).format('MMM');

  return (
    <S.SmallCardWrapper
      to={`${BOOKING_VIEW_URL.replace(':id', bookingID)}`}
      type={type}
    >
      <S.LeftDiv type={type}>
        <S.LeftTop type={type}>
          <S.LeftTopContent>
            <DatesRange color="white" style={{ paddingBottom: 0 }}>
              {startDay}
            </DatesRange>
            <DateMonth style={{ color: 'white' }}>{startMonth}</DateMonth>
          </S.LeftTopContent>
          <S.LeftTopContent>
            <DatesRange
              color="lighterGray"
              style={{
                textAlign: 'center',
                position: 'absolute',
                top: '-5px',
                right: isMobile ? '15%' : '7%',
                width: '100%',
              }}
            >
              -
            </DatesRange>
          </S.LeftTopContent>
          <S.LeftTopContent>
            <DatesRange color="white" style={{ paddingBottom: 0 }}>
              {endDay}
            </DatesRange>
            <DateMonth style={{ color: 'white' }}>{endMonth}</DateMonth>
          </S.LeftTopContent>
        </S.LeftTop>
        {type === 'big' ? (
          <S.LeftBottom type={type}>
            <S.InnerBottom>
              <S.SubTitle>
                {role === 'intern' ? 'Cost' : 'Earnings'}{' '}
              </S.SubTitle>

              <S.Cost type={type}>£{formatPrice(price)}</S.Cost>
            </S.InnerBottom>
            <S.InnerBottom>
              <S.SubTitle>Status:</S.SubTitle>
              <S.Tag>
                <S.Status>{tidyStatusText(status)}</S.Status>
              </S.Tag>
            </S.InnerBottom>
          </S.LeftBottom>
        ) : (
          <S.LeftBottom type={type}>
            <S.Cost type={type}>£{formatPrice(price)}</S.Cost>
          </S.LeftBottom>
        )}
      </S.LeftDiv>
      <S.RightDiv type={type}>
        {type === 'big' && <S.SubTitle>{withUserType}</S.SubTitle>}
        <Name style={{ marginBottom: '1rem' }}>{withUser}</Name>

        {type === 'big' && (
          <>
            <S.Body>{bio.length > 0 ? truncateString(bio, 90) : 'N.A'}</S.Body>
            <S.Body>
              <S.InterestTitle>Interests:</S.InterestTitle>{' '}
              {interests.length > 0 ? interests.join(', ') : 'N/A'}
            </S.Body>
          </>
        )}
        <S.ViewBooking>
          VIEW BOOKING{' '}
          <Icon icon="arrow" direction="right" width="15px" height="15px" />
        </S.ViewBooking>
      </S.RightDiv>
    </S.SmallCardWrapper>
  );
};

export default BookingCards;
