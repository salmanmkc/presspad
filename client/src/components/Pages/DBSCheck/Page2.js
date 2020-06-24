import React from 'react';
import { withWindowWidth } from '../../../HOCs';
import * as S from './style';
import { DBS_EXTERNAL } from '../../../constants/externalLinks';
import { colors } from '../../../theme';
import { SectionTitle, PS, Link } from '../../Common/Typography';
import Icon from '../../Common/Icon';

const Page2 = () => (
  <S.Wrapper>
    <SectionTitle>DBS Check</SectionTitle>
    <PS mb="4">
      This process takes 15-20 minutes. Before you start you’ll need:
    </PS>
    <S.List>
      <S.ListItem>
        <Icon
          icon="circleTick"
          width="20px"
          height="20px"
          color={colors.lightBlue}
          margin="0 10px 0 0"
        />
        <PS>Proof of Identity (e.g. a passport or driver’s licence)</PS>
      </S.ListItem>
      <S.ListItem>
        <Icon
          icon="circleTick"
          width="20px"
          height="20px"
          color={colors.lightBlue}
          margin="0 10px 0 0"
        />
        <PS>Proof of address (e.g. a utility bill or bank statement)</PS>
      </S.ListItem>
    </S.List>
    <PS mb="4">
      Once submitted, the check usually takes a maximum of 3-5 business days.
      You will be notified via email and sent a digital copy of your certificate
      once the process is completed.
    </PS>
    <Link mb="8" to={DBS_EXTERNAL} color={colors.lightBlue} isExternal>
      Please click here to begin
    </Link>
    <S.LoginDetails>
      <PS>Your login details are:</PS>
      <PS>
        <span style={{ fontWeight: 'bold' }}>email:</span> info@presspad.co.uk
      </PS>
      <PS>
        <span style={{ fontWeight: 'bold' }}>password:</span> pr&ssPad28512
      </PS>
    </S.LoginDetails>
  </S.Wrapper>
);

export default withWindowWidth(Page2, true);
