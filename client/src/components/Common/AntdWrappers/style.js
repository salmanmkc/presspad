import styled from 'styled-components';
import * as T from '../Typography';

const Wrapper = styled.div`
  margin-top: ${({ mt, theme }) => (mt ? theme.spacings[mt] : 0)};
  margin-bottom: ${({ mb, theme }) => (mb ? theme.spacings[mb] : 0)};
  margin-left: ${({ ml, theme }) => (ml ? theme.spacings[ml] : 0)};
  margin-right: ${({ mr, theme }) => (mr ? theme.spacings[mr] : 0)};
`;

export const SelectWrapper = styled(Wrapper)``;

export const DatePickerWrapper = styled(Wrapper)`
  position: relative;
  width: 100%;
  margin-bottom: ${({ error, theme }) => (error ? theme.spacings[2] : 0)};
`;

export const SwitchWrapper = styled(Wrapper)`
  display: flex;
  align-items: center;

  button {
    margin-right: ${({ theme }) => theme.spacings[2]};
  }
`;

export const Error = styled(T.PXS)`
  position: absolute;
  bottom: -${({ theme }) => theme.spacings[4]};
`;
