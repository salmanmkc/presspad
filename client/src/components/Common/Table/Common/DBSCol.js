import React from 'react';
import * as S from '../style';
import * as T from '../../Typography';
import FileDownload from '../../Files/FileDownload';

const DBSCol = (colTitle, updateDBS) => ({
  title: 'DBS Details',
  dataIndex: 'dbsCheck',
  key: 'dbsCheck',
  className: 'dbsCol',
  render: (dbs, record) => (
    <>
      <T.PXS>{(dbs && dbs.refNum) || 'N/A'}</T.PXS>
      {dbs && dbs.url ? (
        <FileDownload
          style={{ marginBottom: '10px', border: '1px red solid' }}
          url={dbs.url}
          fileName="View certificate"
        />
      ) : (
        <T.PXS>No certificate</T.PXS>
      )}
      <S.EditButton onClick={() => updateDBS(record)}>Edit</S.EditButton>
    </>
  ),
});

export default DBSCol;
