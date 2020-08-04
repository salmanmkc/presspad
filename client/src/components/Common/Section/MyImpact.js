import React from 'react';
import * as S from './style';
import * as T from '../Typography';

import { Row, Col } from '../Grid';

import formatPrice from '../../../helpers/formatPrice';

const MyImpact = ({ totalInterns, totalPaid }) => (
  <S.Wrapper>
    <Row mb={5}>
      <Col w={[4, 12, 12]}>
        <S.Title>My Impact</S.Title>
      </Col>
    </Row>
    <Row mb={3}>
      <Col
        w={[4, 12, 12]}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        <S.StatSection>
          <T.H5 color="black">Supported</T.H5>
          <S.StatWrapper>
            <S.StatNum>{totalInterns || 0}</S.StatNum>
            <S.StatText>interns</S.StatText>
          </S.StatWrapper>
        </S.StatSection>
        <S.StatSection>
          <T.H5 color="black">Contributed</T.H5>
          <S.StatWrapper>
            <S.StatNum color="pink">
              {totalPaid ? formatPrice(totalPaid) : '£0'}
            </S.StatNum>
            <S.StatText>to support accommodation</S.StatText>
          </S.StatWrapper>
        </S.StatSection>
      </Col>
    </Row>
  </S.Wrapper>
);

export default MyImpact;
