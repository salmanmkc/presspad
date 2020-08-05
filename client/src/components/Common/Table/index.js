import React, { useState, useEffect } from 'react';
import { Table as AntdTable } from 'antd';
import SearchBar from '../SearchBar';
import * as S from './style';
import * as T from '../Typography';

import { Row, Col } from '../Grid';

import { filterArray } from '../../../helpers';

const Table = ({
  columns,
  data,
  showSearch,
  pageSize = 20,
  loading,
  tableHeader,
  expandedSection,
  previewLink,
  previewLinkText,
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
      {showSearch && (
        <Row mb={6}>
          <Col w={[4, 8, 6]}>
            <SearchBar data={filteredData} handleSearchBar={handleSearchBar} />
          </Col>
        </Row>
      )}
      <Row mb={4}>
        <Col w={[4, 12, 12]}>
          <AntdTable
            columns={columns}
            dataSource={filteredData}
            pagination={previewLink ? false : { pageSize }}
            scroll={{ x: '100% ' }}
            loading={loading}
            onHeaderRow={() => 'hello'}
            expandable={
              expandedSection && {
                expandedRowRender: (rowData, index) =>
                  expandedSection(rowData, index),
              }
            }
          />
        </Col>
      </Row>

      {previewLink && (
        <Row jc="center" mt={5}>
          <Col
            w={[4, 12, 12]}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <T.Link to={previewLink} style={{ textDecoration: 'underline' }}>
              {previewLinkText}
            </T.Link>
          </Col>
        </Row>
      )}
    </S.Wrapper>
  );
};

export default Table;
