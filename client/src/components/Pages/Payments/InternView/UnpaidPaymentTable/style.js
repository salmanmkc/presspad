import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const TableWrapper = styled.div`
  max-width: 750px;
  margin-top: ${({ theme }) => theme.spacings[4]};
  margin-bottom: ${({ theme }) => theme.spacings[6]};

  button {
    min-width: unset;
    width: 119px;
    height: 35px;
    padding: 0;
    font-size: 14px;
  }
`;
