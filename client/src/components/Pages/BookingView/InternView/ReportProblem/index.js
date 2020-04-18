import React from 'react';
import styled from 'styled-components';

import { P, PBold } from '../../../../Common/Typography';
import ButtonNew from '../../../../Common/ButtonNew';

const Wrapper = styled.div`
  max-width: 410px;
  height: 219px;
  margin: 0 auto;
  margin-top: ${({ theme }) => theme.spacings[7]};
  padding: ${({ theme: { spacings } }) => `${spacings[4]} ${spacings[4]}`};
  @media ${({ theme: { breakpoints } }) => breakpoints.tablet} {
    padding: ${({ theme: { spacings } }) => `${spacings[4]} ${spacings[5]}`};
    margin: unset;
    margin-top: ${({ theme }) => theme.spacings[7]};
  }
`;

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
