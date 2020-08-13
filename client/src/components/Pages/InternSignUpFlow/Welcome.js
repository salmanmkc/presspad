import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import InternSteps from '../../Layouts/SignupLayout/InternSteps';

import { INTERN_SIGNUP_ABOUT_ME } from '../../../constants/navRoutes';
// COMMON COMPONENTS
import Button from '../../Common/ButtonNew';

import Title from '../../Common/Title';

import { Row, Col } from '../../Common/Grid';

import * as T from '../../Common/Typography';

const Welcome = () => {
  useEffect(() => {
    window.scrollTo({
      left: 0,
      top: 0,
    });
  }, []);

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
          <T.H5 color="blue">Welcome to PressPad! </T.H5>
        </Col>
      </Row>
      <Row mb={6}>
        <Col w={[4, 10, 10]}>
          <T.PS color="gray3" mt={2}>
            To finish creating your account and get your listing live, we need
            to know a few things about you.{' '}
          </T.PS>
          <T.PS color="gray3" mt={2}>
            This normally only takes 10 minutes and at any time feel free to
            Save My Progress if you need to pop out and come back to it later.
          </T.PS>
        </Col>
      </Row>
      <InternSteps position="relative" />
      <Row mb={8}>
        <Col w={[4, 12, 5.3]} mt={6}>
          <Button
            type="secondary"
            onClick={() => history.push(INTERN_SIGNUP_ABOUT_ME)}
          >
            GET STARTED{' '}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Welcome;
