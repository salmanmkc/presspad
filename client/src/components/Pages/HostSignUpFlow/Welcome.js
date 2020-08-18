import React from 'react';
import { useHistory } from 'react-router-dom';
import HostSteps from '../../Layouts/SignupLayout/HostSteps';

import { HOST_SIGNUP_ABOUT_ME } from '../../../constants/navRoutes';
// COMMON COMPONENTS
import Button from '../../Common/ButtonNew';

import Title from '../../Common/Title';

import { Row, Col } from '../../Common/Grid';

import * as T from '../../Common/Typography';

const Welcome = () => {
  const history = useHistory();
  return (
    <div>
      <Row>
        <Title withBg mb="0">
          <Col w={[4, 12, 12]}>SIGN UP</Col>
        </Title>
      </Row>
      <Row>
        <Col w={[4, 12, 12]} mt={6}>
          <T.H3 color="blue">Welcome to PressPad! </T.H3>
        </Col>
      </Row>
      <Row mb={6}>
        <Col w={[4, 10, 10]}>
          <T.PS color="gray3" mt={4}>
            To finish creating your account and get your listing live, we need
            to know a few things about you.
          </T.PS>
          <T.PS color="gray3" mt={5}>
            This normally only takes 10 minutes. At any time feel free to ‘Save
            My Progress’ if you need to and come back to finish it later.
          </T.PS>
        </Col>
      </Row>
      <HostSteps position="relative" />
      <Row mb={8}>
        <Col w={[4, 12, 5.3]} mt={6}>
          <Button
            type="secondary"
            onClick={() => history.push(HOST_SIGNUP_ABOUT_ME)}
          >
            GET STARTED{' '}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Welcome;
