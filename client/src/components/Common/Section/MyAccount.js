import React from 'react';
import * as S from './style';
import * as T from '../Typography';
import Button from '../ButtonNew';

import { Row, Col } from '../Grid';

import formatPrice from '../../../helpers/formatPrice';

const Reviews = ({
  funds,
  liveCodes,
  liveCodesCost,
  liveBookings,
  addFunds,
  addCodes,
}) => (
  <S.Wrapper>
    <Row>
      <Col w={[4, 12, 12]}>
        <S.Title mb={5}>My Account</S.Title>
      </Col>
    </Row>
    <Row mb={3}>
      <Col w={[4, 8, 8]}>
        <T.PXS>Available Funds:</T.PXS>
        <T.PXSBold>{funds ? formatPrice(funds) : 'N/A'}</T.PXSBold>
      </Col>
      <Col w={[4, 4, 4]}>
        <Button
          small
          label="ADD FUNDS"
          onClick={addFunds}
          type="primary"
          bgColor="darkBlue"
        />
      </Col>
    </Row>
    <Row mb={3}>
      <Col w={[4, 8, 8]}>
        <T.PXS>Live Discount Codes:</T.PXS>
        <T.PXSBold>{liveCodes}</T.PXSBold>
      </Col>
      <Col w={[4, 4, 4]}>
        <Button
          small
          label="ADD codes"
          onClick={addCodes}
          type="primary"
          bgColor="darkBlue"
        />
      </Col>
    </Row>
    <Row mb={3}>
      <Col w={[4, 8, 8]}>
        <T.PXS>Live Codes Total Value:</T.PXS>
        <T.PXSBold>
          {liveCodesCost ? formatPrice(liveCodesCost) : 'N/A'}
        </T.PXSBold>
      </Col>
    </Row>
    <Row>
      <Col w={[4, 8, 8]}>
        <T.PXS>Currently hosted:</T.PXS>
        <T.PXSBold>{liveBookings}</T.PXSBold>
      </Col>
    </Row>
  </S.Wrapper>
);

export default Reviews;
