import React, { useState } from 'react';
import { withWindowWidth } from '../../../HOCs';
import * as S from './style';
import Button from '../../Common/ButtonNew/index';
import { SectionTitle, PS, Link } from '../../Common/Typography';
import { DBS_EXTERNAL } from '../../../constants/externalLinks';
import Logo from '../../../assets/presspad-logo.png';
import Icon from '../../Common/Icon';
import { colors } from '../../../theme';

const DBSCheckPage = () => {
  const [page, setPage] = useState(1);

  return (
    <>
      <S.Header>
        <S.Logo src={Logo} alt="logo" />
      </S.Header>
      {page === 1 && (
        <S.Wrapper>
          <SectionTitle>DBS Check</SectionTitle>
          <PS mb="4">
            The Disclosure and Barring Service (DBS) in the UK government run
            criminal records or DBS checks. This check helps us safeguard the
            PressPad community.
          </PS>
          <PS mb="8">
            We will help you carry out a DBS check in a matter of minutes for
            free, and this certificate can be used by yourself for any future
            work related opportunities you have.
          </PS>
          <Button type="primary" onClick={() => setPage(2)}>
            Next
          </Button>
        </S.Wrapper>
      )}
      {page === 2 && (
        <S.Wrapper>
          <SectionTitle>DBS Check</SectionTitle>
          <PS mb="4">
            This normally takes just 15 minutes. Before you start you’ll need:
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
              <PS>Proof of Identity (either a passport or driver’s licence)</PS>
            </S.ListItem>
            <S.ListItem>
              <Icon
                icon="circleTick"
                width="20px"
                height="20px"
                color={colors.lightBlue}
                margin="0 10px 0 0"
              />
              <PS>
                Proof of address (either a utility bill or bank statement with
                your address){' '}
              </PS>
            </S.ListItem>
          </S.List>
          <PS mb="4">
            Once submitted the check usually takes from 1 hour to 3-5 business
            days and you will be notified via email.
          </PS>
          <PS mb="4">Please click the link below to begin.</PS>
          <S.LoginDetails>
            <PS>Your login details are:</PS>
            <PS>
              <span style={{ fontWeight: 'bold' }}>email:</span>{' '}
              info@presspad.co.uk
            </PS>
            <PS>
              <span style={{ fontWeight: 'bold' }}>password:</span>{' '}
              pr&ssPad28512
            </PS>
          </S.LoginDetails>
          <Link mb="8" to={DBS_EXTERNAL} color={colors.lightBlue} isExternal>
            {DBS_EXTERNAL}
          </Link>
        </S.Wrapper>
      )}
    </>
  );
};

export default withWindowWidth(DBSCheckPage, true);
