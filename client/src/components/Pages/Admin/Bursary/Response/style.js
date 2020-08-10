import styled from 'styled-components';

import { Col } from '../../../../Common/Grid';
import { breakpoints } from '../../../../../theme';

export const PinkDiv = styled(Col)`
  position: fixed;
  min-height: 100vh;
  right: 0;
  top: 0;
  with: ;
  background: ${({ theme }) => theme.colors.pink};
  display: none;

  @media ${breakpoints.mobileXL} {
    display: block;
  }
`;

export const Warning = styled(Col)`
  display: flex;
  width: 100%;
`;
