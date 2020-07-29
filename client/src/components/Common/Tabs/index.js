import React, { useState } from 'react';
import styled, { withTheme } from 'styled-components';
import { Col, Row } from '../Grid';
import * as T from '../Typography';

const Button = styled.button`
  background: none;
  border: none;
  box-shadow: none;
  outline: none;
  cursor: pointer;
  background-color: ${({ theme, selected }) => (selected ? 'red' : 'green')};
`;

const TabButton = withTheme(({ index, handleClick, children, selected }) => (
  <Button selected={selected} onClick={() => handleClick(index)}>
    <T.H4 color={selected ? 'white' : 'gray'}>{children}</T.H4>
  </Button>
));

const Tabs = () => {
  const [selected, setSelected] = useState(null);
  const items = ['my account', 'about me', 'my listing', 'verifications'];
  const handleClick = e => {
    setSelected(e);
  };

  return (
    <Row>
      {items.map((item, i) => {
        const index = i;
        const isSelected = selected === index;
        return (
          <Col w={[2, 2, 2]} key={index}>
            <TabButton
              index={index}
              handleClick={handleClick}
              selected={isSelected}
            >
              {item}
            </TabButton>
          </Col>
        );
      })}
    </Row>
  );
};

export default Tabs;
