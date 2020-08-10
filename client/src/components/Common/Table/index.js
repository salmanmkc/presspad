import React, { useState, useEffect } from 'react';
import { Table as AntdTable } from 'antd';
import SearchBar from '../SearchBar';
import * as S from './style';
import * as T from '../Typography';

import { Row, Col } from '../Grid';
import Icon from '../Icon';

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
  previewClickEvent,
  previewAlign,
  embed,
  showImage,
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
    <S.Wrapper embed={embed}>
      {tableHeader && (
        <Row mb={6}>
          <Col w={[3, 8, 8]}>
            <T.H4C color="black">{tableHeader}</T.H4C>
          </Col>
          {showImage && (
            <Col
              w={[1, 4, 4]}
              style={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              <Icon
                icon="money"
                width="100%"
                height="auto"
                style={{ position: 'absolute', maxWidth: '78px' }}
              />
            </Col>
          )}
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
            pagination={previewLink || previewClickEvent ? false : { pageSize }}
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
      {previewClickEvent && (
        <Row jc="center" mt={6}>
          <Col
            w={[4, 12, 12]}
            style={{
              display: 'flex',
              justifyContent: previewAlign === 'right' ? 'flex-end' : 'center',
              alignItems: 'center',
            }}
          >
            <button
              style={{ background: 'none', border: 'none' }}
              type="button"
              onClick={previewClickEvent}
            >
              {previewLinkText}
              {previewAlign === 'right' && (
                <Icon icon="arrow2" width="12px" margin="0 0 0 10px" />
              )}
            </button>
          </Col>
        </Row>
      )}

      {previewLink && (
        <Row jc="center" mt={6}>
          <Col
            w={[4, 12, 12]}
            style={{
              display: 'flex',
              justifyContent: previewAlign === 'right' ? 'flex-end' : 'center',
              alignItems: 'center',
            }}
          >
            <T.Link
              to={previewLink}
              style={{
                textDecoration: previewAlign !== 'right' && 'underline',
                textTransform: previewAlign === 'right' && 'uppercase',
              }}
            >
              {previewLinkText}
              {previewAlign === 'right' && (
                <Icon icon="arrow2" width="12px" margin="0 0 0 10px" />
              )}
            </T.Link>
          </Col>
        </Row>
      )}
    </S.Wrapper>
  );
};

export default Table;
