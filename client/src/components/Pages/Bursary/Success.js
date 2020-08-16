import React from 'react';
import { useHistory } from 'react-router-dom';
import Title from '../../Common/Title';
import * as S from './style';
import * as T from '../../Common/Typography';
import Button from '../../Common/ButtonNew';
import { Col, Row } from '../../Common/Grid';
import { DASHBOARD_URL } from '../../../constants/navRoutes';

const Success = () => {
  const history = useHistory();
  return (
    <S.SuccessWrapper>
      <S.TitleContainer>
        <Title>THANK YOU FOR APPLYING TO THE BURSARY</Title>
      </S.TitleContainer>
      <T.PLBold color="pink" mt={4}>
        That’s it! You’ve successfully signed up.
      </T.PLBold>
      <T.P color="gray3" mt={2}>
        As soon as our team has approved your account you’ll be ready to book
        your first host and prepare for your stay! It’s an exciting and maybe
        nerve-wracking time but don’t worry, we’ve got your back. And not just
        when it comes to finding a place to stay, we’ve got tonnes of advice and
        support available too.
      </T.P>
      <Row mt={6}>
        <Col w={[4, 8, 8]}>
          <Button type="secondary" onClick={() => history.push(DASHBOARD_URL)}>
            BACK TO DASHBOARD
          </Button>
        </Col>
      </Row>
    </S.SuccessWrapper>
  );
};

export default Success;
