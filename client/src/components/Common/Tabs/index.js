import React from 'react';
import styled, { withTheme } from 'styled-components';
import { Row } from '../Grid';
import * as T from '../Typography';

const Button = styled.button`
  background: none;
  border: none;
  box-shadow: none;
  outline: none;
  padding: 5px 10px;
  cursor: pointer;
  margin-right: 5%;
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

const Tabs = ({ items, caps, handleClick, selected }) => (
  <Row>
    {items.map((item, i) => {
      const index = i;
      const isSelected = selected === index;
      return (
        <TabButton
          caps={caps}
          index={index}
          handleClick={handleClick}
          selected={isSelected}
        >
          {item}
        </TabButton>
      );
    })}
  </Row>
);
export default Tabs;
