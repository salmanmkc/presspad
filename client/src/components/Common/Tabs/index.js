import React, { useState } from 'react';
import styled, { withTheme } from 'styled-components';
import { Col, Row } from '../Grid';
import * as T from '../Typography';

const Button = styled.button`
  background: none;
  border: none;
  box-shadow: none;
  outline: none;
  padding: 5px 10px;
  cursor: pointer;
  background-color: ${({ theme, selected }) =>
    selected ? theme.colors.pink : 'transparent'};
`;

const TabButton = withTheme(
  ({ index, handleClick, children, selected, caps }) => (
    <Button selected={selected} onClick={() => handleClick(index)}>
      {caps ? (
        <T.H5C color={selected ? 'white' : 'gray'}>{children}</T.H5C>
      ) : (
        <T.H5 color={selected ? 'white' : 'gray'}>{children}</T.H5>
      )}
    </Button>
  ),
);

const Tabs = ({ items, caps }) => {
  const [selected, setSelected] = useState(null);

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
              caps={caps}
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
