import React from 'react';
import { withWindowWidth } from '../../../HOCs';
import * as S from './style';
import Button from '../../Common/ButtonNew/index';
import { SectionTitle, PS } from '../../Common/Typography';

const Page1 = ({ setPage }) => (
  <S.Wrapper>
    <SectionTitle>DBS Check</SectionTitle>
    <PS mb="4">
      The Disclosure and Barring Service (DBS) is the UK government-run criminal
      records check. Everyone with a profile on our platform has been DBS
      checked. This check helps us safeguard the PressPad community.
    </PS>
    <PS mb="8">
      We will help you carry out a DBS check in a matter of minutes, for free:
      it's our gift to you! This certificate then belongs to you and can be used
      for any future work-related opportunities you may need one for.
    </PS>
    <Button type="primary" onClick={() => setPage(2)}>
      Next
    </Button>
  </S.Wrapper>
);

export default withWindowWidth(Page1, true);
