import React from 'react';
import * as S from './style';
import * as T from '../Typography';

import { Row, Col } from '../Grid';

import { SETTINGS } from '../../../constants/navRoutes';

const InternshipDetails = ({ internOpps }) => (
  <S.Wrapper>
    <Row mb={5}>
      <Col w={[4, 12, 12]}>
        <S.Title>Internship Opportunities</S.Title>
      </Col>
    </Row>
    {internOpps && internOpps.length > 0 ? (
      internOpps.map(opp => (
        <Row mb={3}>
          <Col w={[4, 12, 12]}>
            <T.P>- {opp}</T.P>
          </Col>
        </Row>
      ))
    ) : (
      <T.P>No reviews to show</T.P>
    )}
    <Row>
      <Col
        w={[4, 12, 12]}
        style={{ display: 'flex', justifyContent: 'flex-end' }}
      >
        <T.Link to={SETTINGS.EDIT_PROFILE} color="pink" caps>
          Edit Profile
        </T.Link>
      </Col>
    </Row>
  </S.Wrapper>
);

export default InternshipDetails;
