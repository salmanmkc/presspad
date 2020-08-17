import styled, { css } from 'styled-components';
import * as T from '../Typography';
import { breakpoints } from '../../../theme';

const Wrapper = styled.div`
  margin-top: ${({ mt, theme }) => (mt ? theme.spacings[mt] : 0)};
  margin-bottom: ${({ mb, theme }) => (mb ? theme.spacings[mb] : 0)};
  margin-left: ${({ ml, theme }) => (ml ? theme.spacings[ml] : 0)};
  margin-right: ${({ mr, theme }) => (mr ? theme.spacings[mr] : 0)};
  font-family: Glacial Indifference !important;
`;

const commonInputStyles = props => css`
  width: ${props.width || '100%'};
  height: ${props.height || '50px'};
  min-height: 50px;
  color: ${({ theme }) => props.color || theme.colors.gray3};
  margin: ${props.margin || '0 0 0 0'};
  border-radius: 10px;
  border: ${({ theme, error }) =>
    error ? theme.borders.error : theme.borders.inputBox};
  font-size: 1rem !important;
  font-family: Glacial Indifference !important;

  :active,
  :focus {
    border-color: ${({ theme }) => theme.colors.blue};
  }
  ${props.customStyle};
`;

export const SelectWrapper = styled(Wrapper)`
  .ant-select,
  .ant-select-selector {
    ${commonInputStyles}
    border: none;
  }

  .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
    height: 100%;
  }

  .ant-select-single:not(.ant-select-customize-input)
    .ant-select-selector
    .ant-select-selection-search-input {
    height: 100%;
    display: flex;
    align-items: center;
  }

  .ant-select-single .ant-select-selector .ant-select-selection-item,
  .ant-select-single .ant-select-selector .ant-select-selection-placeholder {
    display: flex;
    align-items: center;
  }

  .ant-select-arrow,
  .ant-select-clear,
  .ant-select-selection-item-remove {
    color: ${({ theme }) => theme.colors.primary};
    width: 21px;
    height: 96%;
    top: 7px;
    display: flex;
    align-items: center;

    :selected {
      transform: roate(90deg);
    }
  }

  .ant-select-multiple .ant-select-selector {
    ${commonInputStyles}
  }

  .ant-select-multiple .ant-select-selection-item {
    height: 80%;
    display: flex;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.lighterGray};
  }
`;

export const DatePickerWrapper = styled(Wrapper)`
  position: relative;
  margin-bottom: ${({ error, theme }) => (error ? theme.spacings[2] : 0)};

  .ant-picker {
    ${commonInputStyles}
  }

  .ant-picker-focused {
    ${commonInputStyles}
    \border-color: ${({ theme }) => theme.colors.blue};
  }

  .ant-picker-suffix {
    display: flex;
    align-items: center;
  }
`;

export const DateRangeWrapper = styled(Wrapper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .ant-picker {
    ${commonInputStyles}
    margin-bottom: ${({ theme }) => theme.spacings[3]};
    margin-top: ${({ theme }) => theme.spacings[3]};
  }

  .ant-picker-focused {
    box-shadow: none;
    -webkit-box-shadow: none;
    border-color: ${({ theme }) => theme.colors.blue};
  }

  .ant-picker-suffix {
    display: flex;
    align-items: center;
  }

  @media ${breakpoints.tablet} {
    flex-direction: row;
    justify-content: space-evenly;

    .ant-picker {
      ${commonInputStyles}
      margin-bottom: 0;
      margin-top: 0;
    }
  }
`;

export const SwitchWrapper = styled(Wrapper)`
  display: flex;
  align-items: center;
  position: relative;

  button {
    margin-right: ${({ theme }) => theme.spacings[2]};
  }
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: ${({ error, theme }) => (error ? theme.spacings[2] : 0)};
  margin-top: ${({ mt, theme }) => (mt ? theme.spacings[mt] : 0)};
  margin-left: ${({ ml, theme }) => (ml ? theme.spacings[ml] : 0)};
  margin-right: ${({ mr, theme }) => (mr ? theme.spacings[mr] : 0)};

  .ant-input-group-addon {
    background: none;
  }

  input {
    ${commonInputStyles}
  }
`;

export const Error = styled(T.PXS)`
  color: ${({ theme }) => theme.colors.pink};
  padding-left: ${({ theme, checkbox }) =>
    checkbox ? theme.spacings[5] : theme.spacings[2]};
`;

export const CrossBtn = styled.button`
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
  display: ${({ show }) => (show ? 'flex' : 'none')};
  align-items: center;
  align-self: flex-end;
  color: ${({ theme, color }) => (color ? theme.colors[color] : 'inherit')};

  @media ${breakpoints.tablet} {
    align-self: center;
    margin-left: ${({ theme }) => theme.spacings[4]};
  }
`;

export const AddBtn = styled.button`
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
  display: ${({ show }) => (show ? 'block' : 'none')};
  font-weight: bold;
  color: ${({ theme, color }) => (color ? theme.colors[color] : 'inherit')};
  margin-bottom: ${({ theme }) => theme.spacings[3]};
`;

export const CrossLabel = styled(T.PXS)`
  color: ${({ theme }) => theme.colors.darkGray};

  @media ${breakpoints.tablet} {
    display: none;
  }
`;

export const CheckboxWrapper = styled(Wrapper)`
  display: flex;
  font-size: ${({ size }) => (size === 'small' ? '14px' : '16px')} !important;

  :hover {
    .ant-checkbox-inner {
      border-color: ${({ theme }) => theme.colors.pink} !important;
    }

    .ant-checkbox-checked .ant-checkbox-inner {
      border-color: ${({ theme }) => theme.colors.pink} !important;
      background-color: ${({ theme }) => theme.colors.pink} !important;
    }

    input {
      border-color: ${({ theme }) => theme.colors.pink} !important;
    }

    .ant-checkbox-inner {
      border-color: ${({ theme }) => theme.colors.pink} !important;
    }

    .ant-checkbox {
      border-color: ${({ theme }) => theme.colors.pink} !important;
    }
  }

  .ant-checkbox {
    top: 5px;
    margin-right: 5px;
    height: 15px;
    border: none;
    borderradius: 50%;
    border-color: ${({ theme }) => theme.colors.pink} !important;
  }

  input {
    border-color: ${({ theme }) => theme.colors.pink} !important;
  }

  .ant-checkbox-inner {
    border-color: ${({ theme }) => theme.colors.pink} !important;
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    border-color: ${({ theme }) => theme.colors.pink} !important;
    background-color: ${({ theme }) => theme.colors.pink} !important;
  }
`;

export const InfoWrapper = styled.div`
  display: flex;
  padding-top: ${({ theme }) => theme.spacings[3]};
`;

export const BoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  width: 100%;
  border-width: 1px;
  border-radius: 5px;
  border-color: ${({ theme, error }) =>
    error ? theme.colors.pink : theme.colors.lighterGray};
  border-style: dashed;
  background-color: ${({ theme }) => theme.colors.lightestGray};
  outline: none;
  transition: border 0.24s ease-in-out;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  min-height: 145px;

  :focus,
  :active,
  :hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const FileNameWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  width: 100%;
  margin-top: ${({ theme }) => theme.spacings[1]};
`;

export const UploadContainer = styled.section`
  display: flex;
  flex-direction: ${({ profile }) => (profile ? 'row' : 'column')};
  width: 100%;
`;

export const ThumbsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evely;
  margin-top: 16px
  width: 100%;
`;

export const Thumb = styled.div`
  display: inline-flex;
  // display: block;
  margin-bottom: 8px;
  margin-right: 8px;
  padding: 4px;
  justify-content: center;
  width: 100%;
  height: ${({ profile }) => (profile ? '100%' : '200px')};
`;

export const ThumbInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 0;
  width: 100%;
  height: 100%;
  margin-right: ${({ profile }) => (profile ? '20px' : '0')};
  // overflow: hidden;
`;

export const ImageWrap = styled.div`
  width: ${({ profile }) => (profile ? '180px' : '100%')};
  height: ${({ profile }) => (profile ? '180px' : '100%')};
  overflow: hidden;
  border-radius: ${({ profile }) => (profile ? '50%' : '5px')};
  margin-bottom: ${({ profile, theme }) =>
    profile ? theme.spacings[2] : theme.spacings[1]};
`;

export const StyledImage = styled.img`
  display: block;
  height: auto;
  min-height: 100%;
  width: 100%;
  margin: 0 auto;
`;

export const DeleteBtn = styled.button`
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  align-self: flex-start;
  color: ${({ theme }) => theme.colors.pink};
`;

export const FileWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacings[2]};
`;
