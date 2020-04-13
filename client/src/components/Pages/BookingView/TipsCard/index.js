import React from 'react';

import { H4C, PXS } from '../../../Common/Typography';
import { ReactComponent as TipsStar } from '../../../../assets/tips-star.svg';
import { Wrapper, TitleWrapper, ItemLi } from './TipsCard.style';

const TipsCard = ({ list, userRole }) => (
  <Wrapper>
    <TitleWrapper>
      <H4C>Tips on how to be a good {userRole}</H4C>
      <TipsStar />
    </TitleWrapper>
    {list.map(text => (
      <ItemLi key={text}>
        <PXS>{text}</PXS>
      </ItemLi>
    ))}
  </Wrapper>
);

export default TipsCard;
