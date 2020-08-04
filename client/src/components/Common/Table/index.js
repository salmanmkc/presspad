import React from 'react';
import { Table as AntdTable } from 'antd';
import Highlighter from 'react-highlight-words';

const Table = ({ columns, data, hideSearch, pageSize = 20, loading }) => {
  console.log('hey');

  return (
    <AntdTable
      columns={columns}
      dataSource={data}
      pagination={{ pageSize }}
      scroll={{ x: '100% ' }}
      loading={loading}
    />
  );
};

export default Table;
