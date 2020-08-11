import React from 'react';
import { useLocation } from 'react-router-dom';
import * as T from '../../../Common/Typography';
import * as S from './style';
import { Col, Row } from '../../../Common/Grid';

import userTypes from '../../../../constants/userTypes';

import {
  SIGNUP_HOST,
  SIGNUP_INTERN,
  SIGNUP_ORG,
} from '../../../../constants/navRoutes';

const signupRoutes = {
  [userTypes.intern]: SIGNUP_INTERN,
  [userTypes.host]: SIGNUP_HOST,
  [userTypes.organisation]: SIGNUP_ORG,
};

function DeleteAccountSuccess() {
  const location = useLocation();
  const { role } = location.state;

  return (
    <div>
      <Row>
        <Col w={[4, 12, 12]}>
          <S.SuccessHeaderWrapper>
            <T.H2 color="blue">YOUR ACCOUNT HAS BEEN DELETED</T.H2>
          </S.SuccessHeaderWrapper>
        </Col>
      </Row>

      <Row>
        <Col w={[4, 12, 12]}>
          <T.P color="blue" mt={4}>
            All personal details have now been deleted and your account removed.{' '}
          </T.P>
          <T.Link
            to={signupRoutes[role]}
            mt={4}
            style={{ display: 'block', textDecoration: 'underline' }}
          >
            Click here to create a new account
          </T.Link>
        </Col>
      </Row>
    </div>
  );
}

export default DeleteAccountSuccess;
