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

export const EditButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.pink};
  font-weight: bold;
  padding-top: 5px;
  text-align: right;
  width: 100%;
`;

export const Tag = styled.div`
  display: inline-flex;
  background: ${({ type, theme }) => type || theme.colors.black};
  border: none;
  padding: 5px 10px;
  border-radius: 10px;
`;

export const StyledBtn = styled.button`
  outline: none;
  border: none;
  cursor: pointer;
  background: none;
  display: inline-flex;
  margin-right: ${({ theme }) => theme.spacings[3]};
`;
