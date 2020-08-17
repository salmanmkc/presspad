import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Title from '../../../Common/Title';
import Button from '../../../Common/ButtonNew';
import * as T from '../../../Common/Typography';
import { Row, Col } from '../../../Common/Grid';
import OrganisationSteps from '../../../Layouts/SignupLayout/OrganisationSteps';
import { SIGNUP_ORG_ACCOUNT_DETAILS } from '../../../../constants/navRoutes';

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
            To finish creating your account and get your profile live, we need
            to know a few things about your organisation and its needs.
          </T.PS>
          <T.PS color="gray3" mt={2}>
            This normally takes just 10 minutes. If at any time you need to
            stop, just click Save Progress and you can come back to it later.
          </T.PS>
        </Col>
      </Row>
      <OrganisationSteps position="relative" />
      <Row mb={8}>
        <Col w={[4, 12, 5.3]} mt={6}>
          <Button
            type="secondary"
            onClick={() => history.push(SIGNUP_ORG_ACCOUNT_DETAILS)}
          >
            GET STARTED{' '}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Welcome;
