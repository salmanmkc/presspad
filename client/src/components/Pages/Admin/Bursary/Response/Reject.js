import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import * as S from './style';
import * as T from '../../../../Common/Typography';
import { Row, Col } from '../../../../Common/Grid';
import { Input } from '../../../../Common/Inputs';
import ButtonNew from '../../../../Common/ButtonNew';
import Notification from '../../../../Common/Notification';

import { ADMIN_BURSARY } from '../../../../../constants/navRoutes';
import { API_UPDATE_BURSARY_APPLICATIONS } from '../../../../../constants/apiRoutes';

const Reject = () => {
  const [message, setMessage] = useState('');
  const [responseComplete, setResponseComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { id: applicationId } = useParams();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await axios.patch(
        API_UPDATE_BURSARY_APPLICATIONS.replace(':id', applicationId),
        {
          status: 'rejected',
          adminMessage: message,
        },
      );
      setResponseComplete(true);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.error);
      }
      setLoading(false);
    }
  };

  return (
    <Row>
      <Col w={[4, 8, 8]}>
        <Row mb={5}>
          <Col w={[4, 12, 12]}>
            <T.H2 color="blue">Reject bursary</T.H2>
          </Col>
        </Row>
        <Row mb={4}>
          <Col w={[4, 12, 12]}>
            <T.P color="gray3" mb={4}>
              Clicking submit will notify the user their application is
              unsuccessful
            </T.P>
          </Col>
        </Row>
        <Row mb={6}>
          <Col w={[4, 8, 8]}>
            <Input
              textArea
              onChange={e => setMessage(e.target.value)}
              value={message}
              label="Send an optional message"
            />
          </Col>
        </Row>
        <Row>
          <Col w={[4, 6, 6]}>
            <ButtonNew
              label="submit"
              type="secondary"
              onClick={handleSubmit}
              loading={loading}
            >
              Submit
            </ButtonNew>
            {error && (
              <T.PXS color="pink" mt="2">
                {error}
              </T.PXS>
            )}
          </Col>
        </Row>
      </Col>
      <S.PinkDiv w={[0, 4, 4]} />
      <Notification
        open={responseComplete}
        setOpen={setResponseComplete}
        content="Response completed"
        redirectUrl={ADMIN_BURSARY}
      />
    </Row>
  );
};

export default Reject;
