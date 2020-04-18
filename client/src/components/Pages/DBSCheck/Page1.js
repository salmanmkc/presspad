import React from 'react';
import { withWindowWidth } from '../../../HOCs';
import * as S from './style';
import Button from '../../Common/ButtonNew/index';
import { SectionTitle, PS } from '../../Common/Typography';

const Page1 = ({ setPage }) => (
  <S.Wrapper>
    <SectionTitle>DBS Check</SectionTitle>
    <PS mb="4">
      The Disclosure and Barring Service (DBS) in the UK government run criminal
      records or DBS checks. This check helps us safeguard the PressPad
      community.
    </PS>
    <PS mb="8">
      We will help you carry out a DBS check in a matter of minutes for free,
      and this certificate can be used by yourself for any future work related
      opportunities you have.
    </PS>
    <Button type="primary" onClick={() => setPage(2)}>
      Next
    </Button>
  </S.Wrapper>
);

export default withWindowWidth(Page1, true);
