import React from 'react';
import { withTheme } from 'styled-components';

import FunnelPageDate from './FunnelPageData';

import { Row, Col } from '../../Common/Grid';
import * as T from '../../Common/Typography';
import * as S from './styled';
import Button from '../../Common/ButtonNew';

import {
  SIGNUP_INTERN,
  SIGNUP_HOST,
  SIGNUP_ORG,
} from '../../../constants/navRoutes';

const SignUpFunnel = ({ history }) => {
  const signUpLinks = [SIGNUP_INTERN, SIGNUP_HOST, SIGNUP_ORG];
  const handleClick = index => history.push(signUpLinks[index]);
  return (
    <S.Wrapper>
      <Row>
        <Col w={[4, 12, 12]}>
          <S.Title>I am...</S.Title>
        </Col>
      </Row>
      <Row style={{ marginBottom: 40 }}>
        {FunnelPageDate.map((e, i) => (
          <Col w={[4, 8, 4]}>
            <S.Container index={i}>
              <T.H3C color={e.color} mt={3}>
                {e.title}
              </T.H3C>
              <T.P mt={3} style={{ fontSize: 18 }}>
                {e.content}
              </T.P>
              <S.ButtonContainer lastButton={FunnelPageDate.length - 1 === i}>
                <Button type={e.buttonType} onClick={() => handleClick(i)}>
                  create account
                </Button>
              </S.ButtonContainer>
            </S.Container>
          </Col>
        ))}
      </Row>
    </S.Wrapper>
  );
};

export default withTheme(SignUpFunnel);
