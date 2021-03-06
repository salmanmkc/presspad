import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Col } from '../../../Common/Grid';
import * as T from '../../../Common/Typography';

export const Warning = styled(Col)`
  display: flex;
  width: 100%;
`;

export const CancelLink = styled(Link)`
  color: ${({ theme }) => theme.colors.pink};
  padding: 11px 0;
  text-align: ${({ singUP }) => (singUP ? 'center' : 'left')};
  text-decoration: underline;
  display: inline-block;
  width: 100%;
`;

export const Error = styled(T.PXS)`
  color: ${({ theme }) => theme.colors.pink};
  padding-left: ${({ theme }) => theme.spacings[2]};
  padding-top: ${({ theme }) => theme.spacings[1]};
`;
