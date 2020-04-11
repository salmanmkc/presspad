import React from 'react';
import { withWindowWidth } from '../../../HOCs';
import { TABLET_WIDTH } from '../../../constants/screenWidths';
import * as S from './style';

const RightDivLayout = ({
  windowWidth,
  mainContent,
  sideContent,
  isLoggedIn,
  navbarProps,
  renderSide,
}) => {
  const largerThanTablet = windowWidth >= TABLET_WIDTH;

  return (
    <S.Wrapper>
      <S.ContentWrapper>
        <S.Content>{mainContent}</S.Content>
      </S.ContentWrapper>
      {(renderSide || largerThanTablet) && <S.SideBar>{sideContent}</S.SideBar>}
    </S.Wrapper>
  );
};

export default withWindowWidth(RightDivLayout, true);
