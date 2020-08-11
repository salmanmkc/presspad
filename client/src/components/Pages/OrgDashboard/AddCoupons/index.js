import React, { useEffect, useState, useReducer } from 'react';

import { Row, Col } from '../../../Common/Grid';
import Title from '../../../Common/Title';

const AddCoupons = props => {
  console.log('props', props);

  return (
    <>
      <Row>
        <Title withBg caps>
          <Col w={[4, 12, 12]}>add funds</Col>
        </Title>
      </Row>
    </>
  );
};

export default AddCoupons;
