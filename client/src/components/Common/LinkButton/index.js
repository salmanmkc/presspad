import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Icon from '../Icon';
import * as T from '../Typography';

const LinkWrapper = styled(Link)`
  color: ${({ color, theme }) => theme.colors[color] || theme.colors.black};
  display: flex;
`;

const LinkButton = ({ url, color, label }) => (
  <LinkWrapper color={color} to={url || '#'}>
    <T.H7C color={color}>{label}</T.H7C>
    <Icon
      icon="arrow2"
      direction="right"
      width="15px"
      height="15px"
      margin="0 0 0 10px"
    />
  </LinkWrapper>
);

export default LinkButton;
