import React from 'react';

import * as S from './style';
import { PBold, PXS } from '../../../../Common/Typography';

import Icon from '../../../../Common/Icon';

const Policy = () => (
  <S.PolicyContainer>
    <S.IconWrapper>
      <Icon icon="explanationMarkCircle" width="40px" height="40px" />
    </S.IconWrapper>
    <S.PolicyContent>
      <PBold color="gray" mb={4}>
        Remember to check with PressPad internal policy on what makes a booking
        legitimate or illegitimate.
      </PBold>
      <PXS mb={4}>
        A legitimate reason for a cancellation outside of the time limits are
        ones connected to health, family emergencies, compulsory study
        obligations and unavoidable acts of god like extreme weather or
        government restrictions.
      </PXS>
      <PXS mb={4}>
        Illegitimate reasons include double booking by mistake, social
        engagements, lack of organisation and a failure in transport networks.
      </PXS>
      <PXS>
        We can choose to stipulate interns stay with certain hosts if we believe
        that there are medical, dietary, disability or geographical incentives
        that would substantially improve the quality of the connection and
        placement.
      </PXS>
    </S.PolicyContent>
  </S.PolicyContainer>
);
export default Policy;
