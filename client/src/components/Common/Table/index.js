import React, { useState, useEffect } from 'react';
import { Table as AntdTable, Button } from 'antd';
import SearchBar from '../SearchBar';
import * as S from './style';
import * as T from '../Typography';
import Icon from '../Icon';
import { Input } from '../Inputs';

import { Row, Col } from '../Grid';

import { filterArray } from '../../../helpers';

const Table = ({
  columns,
  data,
  showSearch,
  pageSize = 20,
  loading,
  tableHeader,
}) => {
  const [filteredData, setFilteredData] = useState([]);

  const handleSearchBar = ({ target: { value } }) => {
    const filtered = filterArray(data, value);
    setFilteredData(filtered);
  };

  useEffect(() => {
    if (data && !loading) {
      setFilteredData(data);
    }
  }, [columns, data, loading]);

  return (
    <S.Wrapper>
      {tableHeader && (
        <Row mb={6}>
          <Col w={[4, 8, 6]}>
            <T.H4C color="black">{tableHeader}</T.H4C>
          </Col>
        </Row>
      )}
      <Row mb={6}>
        <Col w={[4, 8, 6]}>
          {showSearch && (
            <SearchBar data={filteredData} handleSearchBar={handleSearchBar} />
          )}
        </Col>
      </Row>
      <Row mb={4}>
        <Col w={[4, 12, 12]}>
          <AntdTable
            columns={columns}
            dataSource={filteredData}
            pagination={{ pageSize }}
            scroll={{ x: '100% ' }}
            loading={loading}
          />
        </Col>
      </Row>
    </S.Wrapper>
  );
};

export default Table;
