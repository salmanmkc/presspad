import React from 'react';
import * as S from './style';
import * as T from '../Typography';

import { Row, Col } from '../Grid';

import { SETTINGS } from '../../../constants/navRoutes';

const AccountDetails = ({ firstName, lastName, email, phone }) => (
  <S.Wrapper>
    <Row mb={5}>
      <Col w={[4, 12, 12]}>
        <S.Title>Account Details</S.Title>
      </Col>
    </Row>
    <Row mb={3}>
      <Col w={[4, 12, 12]}>
        <T.H5 color="darkBlue">Account holder</T.H5>
        <T.P>
          {firstName} {lastName}
        </T.P>
      </Col>
    </Row>
    <Row mb={3}>
      <Col w={[4, 12, 12]}>
        <T.H5 color="darkBlue">Email</T.H5>
        <T.P>{email}</T.P>
      </Col>
    </Row>
    <Row mb={3}>
      <Col w={[4, 12, 12]}>
        <T.H5 color="darkBlue">Phone</T.H5>
        <T.P>{phone}</T.P>
      </Col>
    </Row>
    <Row>
      <Col
        w={[4, 12, 12]}
        style={{ display: 'flex', justifyContent: 'flex-end' }}
      >
        <T.Link to={SETTINGS.ACCOUNT} color="pink" caps>
          Edit Details
        </T.Link>
      </Col>
    </Row>
  </S.Wrapper>
);

export default AccountDetails;
