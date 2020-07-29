import React from 'react';

import { withWindowWidth } from '../../../HOCs';
import { TABLET_WIDTH } from '../../../constants/screenWidths';

import community from '../../../assets/Illustrations/community.svg';
import email from '../../../assets/Illustrations/email.svg';
import homeStay from '../../../assets/Illustrations/home_stay.svg';
import listing from '../../../assets/Illustrations/listing.svg';
import presspadMovement from '../../../assets/Illustrations/presspad_movement.svg';
// import referralSchema from '../../../assets/Illustrations/referral_schema.svg';

import * as S from './style';

const images = {
  community,
  email,
  homeStay,
  listing,
  presspadMovement,
};

const IllustrationsLayout = ({ windowWidth, children, image, color }) => {
  const largerThanTablet = windowWidth >= TABLET_WIDTH;
  const topHeaderRendered = !largerThanTablet;

  const imageFile = images[image];

  return (
    <>
      <S.Wrapper>
        {topHeaderRendered && (
          <S.ColouredTopDiv color={color}>
            <S.TopImage src={imageFile} />
          </S.ColouredTopDiv>
        )}
        <S.ContentWrapper>{children}</S.ContentWrapper>

        {!topHeaderRendered && (
          <S.ColouredSideDiv color={color}>
            <S.Image src={imageFile} />
          </S.ColouredSideDiv>
        )}
      </S.Wrapper>
    </>
  );
};

export default withWindowWidth(IllustrationsLayout, true);
