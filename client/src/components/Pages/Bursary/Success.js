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
        PressPad are now reviewing your application for a bursary...
      </T.PLBold>
      <T.P color="gray3" mt={2}>
        You will be updated within 5 working days. We will also let you know
        when the next application period for the allocation of bursaries will
        open.
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
