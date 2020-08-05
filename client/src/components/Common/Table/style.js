import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Wrapper = styled.div`
  padding: ${({ theme }) => `${theme.spacings[6]} ${theme.spacings[4]}`};
  box-shadow: ${({ theme }) => theme.shadows.card};
  width: 100%;
  color: ${({ theme }) => theme.colors.darkerGray};
  position: relative;
  background-color: white;

  .ant-table-thead > tr > th {
    background: ${({ theme }) => theme.colors.white};
    font-family: Glacial Indifference !important;
    font-size: 0.875rem;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.darkBlue};
    font-weight: bold;
  }
`;

export const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 0.875rem;
  font-weight: bold;
`;
