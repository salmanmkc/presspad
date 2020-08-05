import React from 'react';
// import { history } from 'react-router-dom';
import { withTheme } from 'styled-components';

import FunnelPageDate from './FunnelPageData';

import Title from '../../Common/Title';
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
          <Title
            withBg
            bgColor="white"
            textColor="blue"
            style={{ justifyContent: 'flex-start', marginTop: 55 }}
          >
            I am:
          </Title>
        </Col>
      </Row>
      <Row>
        {FunnelPageDate.map((e, i) => (
          <Col w={[4, 12, 4]}>
            <S.Container>
              <T.H3C color={e.color} mt={3}>
                {e.title}
              </T.H3C>
              <T.PL mt={3}>{e.content}</T.PL>
              <Button type={e.buttonType} mt={2} onClick={() => handleClick(i)}>
                create account
              </Button>
            </S.Container>
          </Col>
        ))}
      </Row>
    </S.Wrapper>
  );
};

export default withTheme(SignUpFunnel);