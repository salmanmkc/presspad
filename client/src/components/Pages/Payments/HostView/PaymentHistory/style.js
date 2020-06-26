import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

export const TableWrapper = styled.div`
  max-width: 770px;
`;

export const DateWrapper = styled.div`
  > * {
    display: inline-block;
    padding: 0 2px;
  }
`;

export const Link = styled(RouterLink)`
  color: ${({ theme }) => theme.colors.black};
  font-family: Glacial Indifference;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 14px;
  text-align: right;
  text-transform: uppercase;
`;
