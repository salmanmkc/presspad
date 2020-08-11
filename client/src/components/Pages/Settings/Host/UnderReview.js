import React from 'react';

import * as T from '../../../Common/Typography';
import * as S from './style';
import { Col, Row } from '../../../Common/Grid';

function UnderReview() {
  return (
    <div>
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
            It looks like you’ve updated your DBS information. Our team just
            need to review these new details before we make your profile public
            again. This will take no more than a few working days.
          </T.P>
        </Col>
      </Row>
    </div>
  );
}

export default UnderReview;
