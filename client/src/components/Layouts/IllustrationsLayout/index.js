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
import * as T from '../../Common/Typography';

const images = {
  community,
  email,
  homeStay,
  listing,
  presspadMovement,
};

const IllustrationsLayout = ({
  windowWidth,
  children,
  image,
  color,
  mobileText,
}) => {
  const largerThanTablet = windowWidth >= TABLET_WIDTH;
  const topHeaderRendered = !largerThanTablet;

  const imageFile = images[image];
  return (
    <>
      <S.Wrapper>
        {topHeaderRendered && (
          <S.ColouredTopDiv color={color} isImage={!!imageFile}>
            {!imageFile && image === 'getStarted' ? (
              <T.H1C
                color="white"
                style={{ paddingRight: '0%', textAlign: 'center' }}
              >
                LET’S GET STARTED!
              </T.H1C>
            ) : (
              <>
                {imageFile && <S.TopImage src={imageFile} />}
                {mobileText && <T.H2C color="white">{mobileText}</T.H2C>}
              </>
            )}
          </S.ColouredTopDiv>
        )}
        <S.ContentWrapper>{children}</S.ContentWrapper>

        {!topHeaderRendered && (
          <S.ColouredSideDiv color={color} imageName={image}>
            {!imageFile && image === 'getStarted' ? (
              <S.TitleContainer>
                <T.H0C color="white">LET’S GET STARTED!</T.H0C>
              </S.TitleContainer>
            ) : (
              imageFile && <S.Image src={imageFile} />
            )}
          </S.ColouredSideDiv>
        )}
      </S.Wrapper>
    </>
  );
};

export default withWindowWidth(IllustrationsLayout, true);
