import React from 'react';
import { Input } from 'antd';
import styled from 'styled-components';

const { Search } = Input;

const StyledSearch = styled(Search)`
  margin-top: ${({ mt, theme }) => (mt ? theme.spacings[mt] : 0)};
  margin-bottom: ${({ mb, theme }) => (mb ? theme.spacings[mb] : 0)};
  margin-left: ${({ ml, theme }) => (ml ? theme.spacings[ml] : 0)};
  margin-right: ${({ mr, theme }) => (mr ? theme.spacings[mr] : 0)};
  font-family: Glacial Indifference !important;

  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '50px'};
  color: ${({ theme, color }) => color || theme.colors.gray3};
  border-radius: 10px;
  border: ${({ theme, error }) =>
    error ? theme.borders.error : theme.borders.inputBox};
  font-size: 1rem !important;
  font-family: Glacial Indifference !important;

  .ant-input-wrapper,
  .ant-input-group-addon,
  .ant-btn,
  ant-input-search-button,
  ant-btn-primary {
    height: 100%;
    box-shadow: none;
    border: none;
    margin-right: -2px;
  }

  .ant-btn-primary {
    width: 60px;
    border-radius: 10px 10px 10px 10px;

    svg {
      font-size: 1.25rem;
      padding-top: 0.125rem;
    }
  }

  .ant-input {
    border: none;
    height: 100%;
    box-shadow: none;
    border-radius: 10px;
  }
`;

const SearchBar = ({
  handleSearchBar,
  mt,
  mb,
  ml,
  mr,
  width,
  height,
  customStyle,
}) => (
  <StyledSearch
    onChange={handleSearchBar}
    enterButton
    mt={mt}
    mb={mb}
    ml={ml}
    mr={mr}
    width={width}
    height={height}
    customStyle={customStyle}
    bordered={false}
  />
);

export default SearchBar;
