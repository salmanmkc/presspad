import styled from 'styled-components';

export const BallanceWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: ${({ theme }) => theme.spacings[3]};

  > * {
    color: ${({ theme }) => theme.colors.white};
  }
  > h6 {
    padding-top: 7px;
  }
  > h2 {
    line-height: 1;
  }
`;
