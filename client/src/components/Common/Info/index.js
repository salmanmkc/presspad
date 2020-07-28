import React from 'react';

import styled, { withTheme } from 'styled-components';
import Icon from '../Icon';
import * as T from '../Typography';

const Container = styled.div`
  width: 100%;
  border: 1px solid
    ${({ theme, textColor }) =>
      theme.colors[textColor] || theme.colors.lightBlue};
  display: flex;
  padding: 0 5px;
`;

const Info = withTheme(({ icon, iconW, iconH, textColor, children }) => (
  <Container>
    <div>
      <Icon
        icon={icon || 'money'}
        width={iconW || '60'}
        height={iconH || '70'}
      />
    </div>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <T.H6C color={textColor || 'lightBlue'}>{children}</T.H6C>
    </div>
  </Container>
));

export default Info;
