import React from 'react';
import { Row, Col } from '../components/Common/Grid';

export default {
  title: 'Grid',
};

export const Basic = () => (
  <>
    <Row>
      <Col w={[4, 12, 12]}>
        <p style={{ background: '#FFC709' }}>full width on all screens</p>
      </Col>
    </Row>
    <Row>
      <Col w={[2, 6, 6]}>
        <p style={{ background: '#e57373' }}>50% width on all screens</p>
      </Col>
    </Row>
    <Row>
      <Col w={[2, 12, 4]}>
        <p style={{ background: '#e57373' }}>
          50% mobile => 100% tablet => 33.3% desktop
        </p>
      </Col>
      <Col w={[2, 12, 4]}>
        <p style={{ background: '#00A9CE' }}>
          50% mobile => 100% tablet => 33.3% desktop
        </p>
      </Col>
    </Row>
  </>
);

export const WithTextAlign = () => (
  <>
    <Row jcM="flex-start" jcT="center" jc="flex-end">
      <Col w={[2, 6, 6]}>
        <p style={{ background: '#FFC709' }}>
          justify content left - mobile => center - tablet => right - desktop
        </p>
      </Col>
    </Row>
  </>
);

export const NestedGrid = () => (
  <>
    <Row>
      <Col w={[2, 6, 6]}>
        <Row inner>
          <Col w={[4, 12, 12]}>
            <p style={{ background: '#FFC709' }}>nested</p>
          </Col>
        </Row>
      </Col>
      <Col w={[2, 6, 6]}>
        <Row inner>
          <Col w={[2, 6, 6]}>
            <p style={{ background: '#FFC709' }}>nested</p>
          </Col>
          <Col w={[2, 6, 6]}>
            <p style={{ background: '#FFC7AA' }}>nested</p>
          </Col>
        </Row>
      </Col>
    </Row>

    <Row>
      <Col w={[4, 6, 6]}>
        <p style={{ background: '#FFC709' }}>on root </p>
      </Col>
      <Col w={[4, 6, 6]}>
        <p style={{ background: '#FFC709' }}>on root </p>
      </Col>
    </Row>
  </>
);
