import styled from 'styled-components';

export const Label = styled.div`
  padding: 10px;
  display: table;
  min-width: 115px;

  * {
    text-align: center;
  }
`;

export const CompletedLabel = styled(Label)`
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const PendingLabel = styled(Label)`
  background-color: ${({ theme }) => theme.colors.lightGray};
`;

export const CancelledLabel = styled(Label)`
  background-color: ${({ theme }) => theme.colors.pink};
`;
