import React from 'react';
import * as T from '../Typography';
import * as S from './style';
import Icon from '../Icon';

const InfoSection = ({ text }) => (
  <S.InfoWrapper className="extraInfo">
    <Icon
      icon="info"
      color="pink"
      width="22px"
      height="22px"
      margin="5px 0 0 0"
    />
    <T.PXS color="gray3" ml={2} style={{ maxWidth: '90%' }}>
      {text}
    </T.PXS>
  </S.InfoWrapper>
);

export default InfoSection;
