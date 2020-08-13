import React from 'react';

import * as T from '../../../Common/Typography';
import * as S from './style';
import { Col, Row } from '../../../Common/Grid';
import { PROPERTY_CHECKS } from '../../../../constants/externalLinks';

function BookReview() {
  return (
    <>
      <S.Container>
        <Row>
          <Col w={[4, 12, 12]}>
            <S.SuccessHeaderWrapper>
              <T.H2 color="blue">Under review</T.H2>
            </S.SuccessHeaderWrapper>
          </Col>
        </Row>

        <Row>
          <Col w={[4, 12, 12]}>
            <T.P color="gray3" mt={3}>
              We hope you’re settling into your new home! Since you have changed
              property we need to arrange a new property video check before we
              making your listing public again.
            </T.P>
          </Col>
        </Row>
        <Row>
          <Col w={[4, 12, 12]}>
            <T.P color="gray3" mt={3}>
              <T.Link isExternal to={PROPERTY_CHECKS} color="lightBlue">
                Click here
              </T.Link>{' '}
              to book a time for one of our team to carry out a video check of
              your home. This check will take no longer than 30 minutes maximum.
            </T.P>
          </Col>
        </Row>
      </S.Container>
      <S.RightDiv />
    </>
  );
}

export default BookReview;
