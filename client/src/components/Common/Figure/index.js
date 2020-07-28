import React from 'react';
import styled, { withTheme } from 'styled-components';
import * as T from '../Typography';

const Container = styled.div`
  width: 100%;
`;

const Figure = withTheme(({ stats, title, statsColor, titleColor }) => (
  <Container>
    <T.H1 color={statsColor || 'pink'}>{stats}</T.H1>
    {/* this should be H5 */}
    <T.H4 color={titleColor || 'blue'}>{title}</T.H4>
  </Container>
));

export default Figure;
