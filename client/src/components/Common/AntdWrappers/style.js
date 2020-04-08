import styled from 'styled-components';

export const SelectWrapper = styled.div``;
export const DatePickerWrapper = styled.div``;
export const SwitchWrapper = styled.div`
  display: flex;
  align-items: center;

  button {
    margin-right: ${({ theme }) => theme.spacings[2]};
  }
`;
