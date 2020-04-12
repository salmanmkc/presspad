import styled from 'styled-components';

const Wrapper = styled.div`
  margin-top: ${({ mt, theme }) => (mt ? theme.spacings[mt] : 0)};
  margin-bottom: ${({ mb, theme }) => (mb ? theme.spacings[mb] : 0)};
  margin-left: ${({ ml, theme }) => (ml ? theme.spacings[ml] : 0)};
  margin-right: ${({ mr, theme }) => (mr ? theme.spacings[mr] : 0)};
`;

export const SelectWrapper = styled(Wrapper)``;

export const DatePickerWrapper = styled(Wrapper)``;
export const SwitchWrapper = styled(Wrapper)`
  display: flex;
  align-items: center;

  button {
    margin-right: ${({ theme }) => theme.spacings[2]};
  }
`;
