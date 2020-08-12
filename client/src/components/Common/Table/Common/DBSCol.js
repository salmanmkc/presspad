import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as S from '../style';
import * as T from '../../Typography';
import FileDownload from '../../Files/FileDownload';
import Modal from '../../Modal';
import { Input, UploadFile } from '../../Inputs';
import { Row, Col } from '../../Grid';
import ButtonNew from '../../ButtonNew';
import Notification from '../../Notification';

import { API_ADMIN_UPDATE_PROFILE } from '../../../../constants/apiRoutes';

const updateDBS = (record, dbsSaved) => {
  Modal.confirm({
    title: '',
    content: (
      <DBSForm
        dbsCheck={record.dbsCheck}
        userId={record.id}
        dbsSaved={dbsSaved}
        record={record}
      />
    ),
    hideOkButton: true,
    cancelText: 'close',
  });
};

const DBSCol = (colTitle, dbsSaved) => ({
  title: 'DBS',
  dataIndex: colTitle,
  key: colTitle,
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
      <S.EditButton onClick={() => updateDBS(record, dbsSaved, true)}>
        Edit
      </S.EditButton>
    </>
  ),
});

const DBSForm = ({ dbsCheck, userId, dbsSaved, record }) => {
  const [newDBSDetails, setNewDBSDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [notificationOpen, setNotification] = useState(false);

  const uploadDBSCheck = async () => {
    try {
      const generatedName = `${userId}/${Date.now()}.${newDBSDetails.fileName}`;
      const {
        data: { signedUrl },
      } = await axios.get(`/api/upload/signed-url?fileName=${generatedName}`);
      const headers = {
        'Content-Type': 'application/octet-stream',
      };

      await axios.put(signedUrl, newDBSDetails, {
        headers,
      });

      return {
        fileName: generatedName,
        new: true,
        uploaded: true,
        preview: newDBSDetails.preview,
      };
    } catch (e) {
      dbsSaved(userId, 'error', e);
      return setLoading(false);
    }
  };

  const update = async () => {
    const { refNum, fileName } = newDBSDetails;
    setLoading(true);

    try {
      await uploadDBSCheck();
      await axios.patch(API_ADMIN_UPDATE_PROFILE, {
        fieldsToUpdate: { DBSCheck: { refNum, fileName } },
        userId,
      });
      dbsSaved(userId, 'success', newDBSDetails);
      setNotification(true);
      setLoading(false);
    } catch (err) {
      dbsSaved(userId, 'error', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    setNewDBSDetails(dbsCheck);
  }, [dbsCheck]);

  return (
    <>
      <Row mb={5}>
        <Col w={[4, 12, 12]}>
          <Input
            label="Reference Number"
            defaultValue={dbsCheck && dbsCheck.refNum}
            onChange={e =>
              setNewDBSDetails({ ...newDBSDetails, refNum: e.target.value })
            }
          />
        </Col>
      </Row>

      <UploadFile
        mainText="Drag DBS certificate here"
        type="file"
        setFiles={([file]) =>
          setNewDBSDetails(_newDBSDetails => ({
            ..._newDBSDetails,
            ...file,
            fileName: file.path,
          }))
        }
        files={[newDBSDetails]}
        col={12}
      />
      <Row mb={2} mt={5}>
        <Col w={[4, 12, 12]}>
          <ButtonNew
            type="primary"
            onClick={() => update(newDBSDetails, userId)}
            loading={loading}
          >
            Save Changes
          </ButtonNew>
        </Col>
      </Row>
      <Notification
        setOpen={setNotification}
        open={notificationOpen}
        content="Changes saved"
      />
    </>
  );
};

export default DBSCol;
