import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import * as S from './style';
import * as T from '../../../../Common/Typography';
import { Row, Col } from '../../../../Common/Grid';
import { Input, Checkbox } from '../../../../Common/Inputs';
import ButtonNew from '../../../../Common/ButtonNew';
import Notification from '../../../../Common/Notification';

import { ADMIN_BURSARY } from '../../../../../constants/navRoutes';

const PreApprove = () => {
  const [invite, setInvite] = useState(false);
  const [message, setMessage] = useState('');
  const [responseComplete, setResponseComplete] = useState(false);

  const { id: userId } = useParams();

  const handleSubmit = () => {
    console.log(
      'function to go here submitting the message and invite with the user id',
      userId,
    );
  };

  return (
    <Row>
      <Col w={[4, 8, 8]}>
        <Row mb={5}>
          <Col w={[4, 12, 12]}>
            <T.H2 color="blue">Pre-approve bursary</T.H2>
          </Col>
        </Row>
        <Row mb={4}>
          <Col w={[4, 12, 12]}>
            <T.P color="gray3" mb={4}>
              Clicking submit will notify the user their application is
              successful
            </T.P>
            <Checkbox
              label="Send applicant an invite to an interview"
              checked={invite}
              onChange={() => setInvite(!invite)}
            />
          </Col>
        </Row>
        <Row mb={6}>
          <Col w={[4, 8, 8]}>
            <Input
              textArea
              onChange={e => setMessage(e)}
              value={message}
              label="Send an optional message"
            />
          </Col>
        </Row>
        <Row>
          <Col w={[4, 6, 6]}>
            <ButtonNew label="submit" type="secondary" onClick={handleSubmit}>
              Submit
            </ButtonNew>
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

export default PreApprove;
