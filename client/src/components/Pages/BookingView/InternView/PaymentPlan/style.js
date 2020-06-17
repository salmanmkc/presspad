import styled from 'styled-components';

export const Wrapper = styled.div`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacings[6]};
  max-width: 200px;
  > h6 {
    color: ${({ theme }) => theme.colors.darkBlue};
    border-bottom: 1px solid ${({ theme }) => theme.colors.yellow};
  }
`;

export const PaymentLine = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacings[1]};
  > p {
    color: ${({ transaction, theme }) =>
      transaction ? theme.colors.lighterGray : theme.colors.darkerGray};
  }
`;
