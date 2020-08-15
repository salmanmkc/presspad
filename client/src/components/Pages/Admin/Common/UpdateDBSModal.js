import React, { useState } from 'react';
import Modal from '../../../Common/Modal';

const UpdateDBSModal = ({ open, dbs }) => {
  const [newDBS, setNewDBS] = useState({});

  return <Modal type="confirm" title="Update DBS" content="hey" />;
};

export default UpdateDBSModal;
