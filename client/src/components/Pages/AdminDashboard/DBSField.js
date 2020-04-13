import React, { useState } from 'react';
import { Modal, Input } from 'antd';
import FileDownload from '../../Common/Files/FileDownload';

const DBSField = ({
  dbs,
  userId,
  updateDBS,
  updatingDBS,
  dbsDetails,
  handleDBSChange,
}) => {
  const [modalVisible, setVisibility] = useState(false);
  const [newDBS, setNewDBS] = useState({});

  return (
    <div>
      {console.log(dbs)}
      {dbs ? (
        <>
          <p>
            <span style={{ fontWeight: 'bold' }}>Reference:</span>{' '}
            {dbs.refNum || 'N/A'}
          </p>

          {dbs.url ? (
            <FileDownload url={dbs.url} fileName="View certificate" />
          ) : (
            <p>No certificate</p>
          )}
          <button type="button" onClick={() => updateDBS(dbs, userId)}>
            Click
          </button>
        </>
      ) : (
        <p>hello</p>
      )}
      {/* <Modal
        title="Are you sure?"
        visible={modalVisible}
        onOk={() => console.log('hello')}
        confirmLoading={updatingDBS}
        onCancel={() => setVisibility(false)}
      >
        <p>Here you can edit DBS stuff</p>
        <Input
          name="refNum"
          onChange={e => handleDBSChange(e)}
          id="refNum"
          value={dbsDetails.refNum}
          placeholder="Enter reference number"
        />
      </Modal> */}
    </div>
  );
};

export default DBSField;
