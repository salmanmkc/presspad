import React, { useState } from 'react';
import LinkCopy from '../components/Common/LinkCopy';
import { Col, Row } from '../components/Common/Grid';

export default {
  title: 'LinkCopy',
};

export const LinkCopyComponent = () => {
  const [text, setText] = useState('');

  return (
    <div
      style={{
        width: 800,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '40px auto',
      }}
    >
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <h3>enter test in the input to be copied</h3>
      </div>
      <div
        style={{
          width: '100%',
          height: '200px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <input type="text" onChange={e => setText(e.target.value)} />
        <LinkCopy strToCopy={text} showText />
      </div>
    </div>
  );
};

export const LinkCopyComponentWithText = () => (
  <Row>
    <Col w={[4, 6, 6]}>
      <LinkCopy strToCopy="http://bit.ly/afjwlejfafjla" />
    </Col>
  </Row>
);
