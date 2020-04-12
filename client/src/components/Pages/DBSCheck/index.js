import React from 'react';
import * as S from './style';
import Button from '../../Common/ButtonNew/index';

import Logo from '../../../assets/presspad-logo.png';

const DBSCheckPage = () => (
  <>
    <S.Header>
      <S.Logo src={Logo} alt="logo" />
    </S.Header>
    <S.Wrapper>Content Here</S.Wrapper>
    <Button type="primary">Next</Button>
  </>
);

export default DBSCheckPage;
