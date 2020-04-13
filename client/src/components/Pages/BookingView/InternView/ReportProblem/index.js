import React from 'react';

import { P, PBold } from '../../../../Common/Typography';
import ButtonNew from '../../../../Common/ButtonNew';

import { Wrapper } from './ReportProblem.style';

const ReportProblem = () => (
  <Wrapper>
    <PBold>Report a problem</PBold>
    <P>
      If you believe there is any inappropriate behaviour during your stay
      please click below to get help from the PressPad team
    </P>
    <ButtonNew small type="primary" mt="4">
      report problem
    </ButtonNew>
  </Wrapper>
);

export default ReportProblem;
