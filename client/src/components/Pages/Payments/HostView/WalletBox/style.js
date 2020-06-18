import styled from 'styled-components';

export const BallanceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-top: ${({ theme }) => theme.spacings[4]};
`;
export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacings[6]};

  > button {
    min-width: unset;
    width: 119px;
    height: 35px;
    padding: 0;
    font-size: 14px;
  }
`;

export const PopupContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 1.5rem;
`;
