import React from 'react';
import styled, { withTheme } from 'styled-components';
import * as T from '../Typography';

const Container = styled.div`
  width: 100%;
`;

const Figure = withTheme(({ stats, title, statsColor, titleColor }) => (
  <Container>
    <T.H1 color={statsColor || 'pink'}>{stats}</T.H1>
    <T.H5 color={titleColor || 'blue'}>{title}</T.H5>
  </Container>
));

export default Figure;
