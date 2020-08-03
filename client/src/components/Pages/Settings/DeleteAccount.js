import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Input } from 'antd';
import axios from 'axios';
import * as T from '../../Common/Typography';
import * as S from './style';
import { Col, Row } from '../../Common/Grid';
import { API_USER_BASE } from '../../../constants/apiRoutes';
import DeleteAccountSuccess from './DeleteAccountSuccess';
import { DELETE_ACCOUNT_SUCCESS } from '../../../constants/navRoutes';
import Button from '../../Common/ButtonNew';

function Settings({ resetState, role }) {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState('');

  const history = useHistory();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await axios.delete(API_USER_BASE, { data: { reason } });
      setError('');

      resetState();
      history.push({
        pathname: DELETE_ACCOUNT_SUCCESS,
        state: { role },
      });
    } catch (e) {
      if (e.response && e.response.data && e.response.data.error) {
        setError(e.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Row>
        <Col w={[4, 8, 8]}>
          <T.H2 color="blue">
            Are you sure you want to delete your account?
          </T.H2>
        </Col>
      </Row>
      <Row>
        <Col w={[4, 8, 8]}>
          <S.Label htmlFor="reason">
            We’re sad to see you go! Could you let us know why?
          </S.Label>
          <Input.TextArea
            rows={6}
            id="reason"
            onChange={e => setReason(e.target.value)}
          />
        </Col>
      </Row>

      <Row>
        <Col w={[4, 8, 8]}>
          {error && <S.Error block>{error}</S.Error>}
          <Button
            type="secondary"
            onClick={handleSubmit}
            loading={loading}
            mt={5}
          >
            DELETE ACCOUNT
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export { DeleteAccountSuccess };
export default Settings;
